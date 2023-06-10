require 'rails_helper'

RSpec.describe 'UserSessions', type: :system do
  let(:user) { create(:user) }

  describe 'ログイン前' do
    context 'フォームの入力が正常' do
      it 'ログインに成功する' do
        visit login_path
        fill_in I18n.t('activerecord.attributes.user.email'), with: user.email
        fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
        click_button I18n.t('defaults.login')
        expect(page).to have_content I18n.t('user_sessions.create.success')
        expect(page).to have_current_path photos_path
      end
    end

    context 'メールアドレスが未入力' do
      it 'ログインに失敗する' do
        visit login_path
        fill_in I18n.t('activerecord.attributes.user.email'), with: ''
        fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
        click_button I18n.t('defaults.login')
        expect(page).to have_content I18n.t('user_sessions.create.error_message')
        expect(page).to have_current_path login_path
      end
    end

    context 'メールアドレスが異なる' do
      it 'ログインに失敗する' do
        visit login_path
        fill_in I18n.t('activerecord.attributes.user.email'), with: 'other_password'
        fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
        click_button I18n.t('defaults.login')
        expect(page).to have_content I18n.t('user_sessions.create.error_message')
        expect(page).to have_current_path login_path
      end
    end

    context 'パスワードが未入力' do
      it 'ログインに失敗する' do
        visit login_path
        fill_in I18n.t('activerecord.attributes.user.email'), with: user.email
        fill_in I18n.t('activerecord.attributes.user.password'), with: ''
        click_button I18n.t('defaults.login')
        expect(page).to have_content I18n.t('user_sessions.create.error_message')
        expect(page).to have_current_path login_path
      end
    end

    context 'パスワードが異なる' do
      it 'ログインに失敗する' do
        visit login_path
        fill_in I18n.t('activerecord.attributes.user.email'), with: user.email
        fill_in I18n.t('activerecord.attributes.user.password'), with: 'other_password'
        click_button I18n.t('defaults.login')
        expect(page).to have_content I18n.t('user_sessions.create.error_message')
        expect(page).to have_current_path login_path
      end
    end
  end

  describe 'ログイン後' do
    before { login_as(user) }

    context 'ログアウト' do
      it 'ログアウトに成功する' do
        click_on I18n.t('defaults.logout')
        expect(page).to have_content I18n.t('user_sessions.destroy.success')
        expect(page).to have_current_path root_path
      end
    end

    context 'ログインページへアクセス' do
      it '投稿一覧ページへリダイレクトされること' do
        expect(page).to have_content I18n.t('user_sessions.create.success')
        visit login_path
        expect(page).to have_current_path photos_path
      end
    end
  end
end
