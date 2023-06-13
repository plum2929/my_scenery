require 'rails_helper'

RSpec.describe 'Users', type: :system do
  describe 'ログイン前' do
    describe 'ユーザー新規登録' do
      context 'フォームの入力が正常' do
        it 'ユーザーの新規登録が成功する' do
          visit signup_path
          fill_in I18n.t('activerecord.attributes.user.name'), with: 'user_name'
          fill_in I18n.t('activerecord.attributes.user.email'), with: 'sample@example.com'
          fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
          fill_in I18n.t('activerecord.attributes.user.password_confirmation'), with: 'password'
          click_button I18n.t('defaults.register')
          expect(page).to have_content 'トップページ'
          expect(page).to have_current_path root_path
        end
      end

      context 'ユーザー名が未入力' do
        it 'ユーザーの新規作成が失敗する' do
          visit signup_path
          fill_in I18n.t('activerecord.attributes.user.name'), with: ''
          fill_in I18n.t('activerecord.attributes.user.email'), with: 'sample@example.com'
          fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
          fill_in I18n.t('activerecord.attributes.user.password_confirmation'), with: 'password'
          expect(page).to have_button I18n.t('defaults.register'), disabled: true
          expect(page).to have_content 'ユーザー名を入力してください'
          expect(page).to have_current_path signup_path
        end
      end

      context 'ユーザー名の入力が21文字以上' do
        it 'ユーザーの新規作成が失敗する' do
          visit signup_path
          fill_in I18n.t('activerecord.attributes.user.name'), with: 'a' * 21
          fill_in I18n.t('activerecord.attributes.user.email'), with: 'sample@example.com'
          fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
          fill_in I18n.t('activerecord.attributes.user.password_confirmation'), with: 'password'
          expect(page).to have_button I18n.t('defaults.register'), disabled: true
          expect(page).to have_content 'ユーザー名は20文字以内で入力してください'
          expect(page).to have_current_path signup_path
        end
      end

      context 'メールアドレスが未入力' do
        it 'ユーザーの新規作成が失敗する' do
          visit signup_path
          fill_in I18n.t('activerecord.attributes.user.name'), with: 'user_name'
          fill_in I18n.t('activerecord.attributes.user.email'), with: ''
          fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
          fill_in I18n.t('activerecord.attributes.user.password_confirmation'), with: 'password'
          expect(page).to have_button I18n.t('defaults.register'), disabled: true
          expect(page).to have_content 'メールアドレスを入力してください'
          expect(page).to have_current_path signup_path
        end
      end

      context 'メールアドレスが不正な値' do
        it 'ユーザーの新規作成が失敗する' do
          visit signup_path
          fill_in I18n.t('activerecord.attributes.user.name'), with: 'user_name'
          fill_in I18n.t('activerecord.attributes.user.email'), with: 'sample@example,com'
          fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
          fill_in I18n.t('activerecord.attributes.user.password_confirmation'), with: 'password'
          expect(page).to have_button I18n.t('defaults.register'), disabled: true
          expect(page).to have_content '有効なメールアドレスを入力してください'
          expect(page).to have_current_path signup_path
        end
      end

      context '登録済みのメールアドレスを入力' do
        it 'ユーザーの新規作成が失敗する' do
          existing_user = create(:user)
          visit signup_path
          fill_in I18n.t('activerecord.attributes.user.name'), with: 'user_name'
          fill_in I18n.t('activerecord.attributes.user.email'), with: existing_user.email
          fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
          fill_in I18n.t('activerecord.attributes.user.password_confirmation'), with: 'password'
          click_button I18n.t('defaults.register')
          expect(page).to have_content I18n.t('errors.messages.taken')
          expect(page).to have_current_path signup_path
        end
      end

      context 'パスワードが未入力' do
        it 'ユーザーの新規作成が失敗する' do
          visit signup_path
          fill_in I18n.t('activerecord.attributes.user.name'), with: 'user_name'
          fill_in I18n.t('activerecord.attributes.user.email'), with: 'sample@example.com'
          fill_in I18n.t('activerecord.attributes.user.password'), with: ''
          fill_in I18n.t('activerecord.attributes.user.password_confirmation'), with: 'password'
          expect(page).to have_button I18n.t('defaults.register'), disabled: true
          expect(page).to have_content '8文字以上で入力してください'
          expect(page).to have_current_path signup_path
        end
      end

      context 'パスワードの入力が8文字未満' do
        it 'ユーザーの新規作成が失敗する' do
          visit signup_path
          fill_in I18n.t('activerecord.attributes.user.name'), with: 'user_name'
          fill_in I18n.t('activerecord.attributes.user.email'), with: 'sample@example.com'
          fill_in I18n.t('activerecord.attributes.user.password'), with: 'a' * 7
          fill_in I18n.t('activerecord.attributes.user.password_confirmation'), with: 'password'
          expect(page).to have_button I18n.t('defaults.register'), disabled: true
          expect(page).to have_content '8文字以上で入力してください'
          expect(page).to have_current_path signup_path
        end
      end

      context 'パスワード(確認)が未入力' do
        it 'ユーザーの新規作成が失敗する' do
          visit signup_path
          fill_in I18n.t('activerecord.attributes.user.name'), with: 'user_name'
          fill_in I18n.t('activerecord.attributes.user.email'), with: 'sample@example.com'
          fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
          fill_in I18n.t('activerecord.attributes.user.password_confirmation'), with: ''
          expect(page).to have_button I18n.t('defaults.register'), disabled: true
          expect(page).to have_current_path signup_path
        end
      end

      context 'パスワードとパスワード(確認)の入力が一致しない' do
        it 'ユーザーの新規作成が失敗する' do
          visit signup_path
          fill_in I18n.t('activerecord.attributes.user.name'), with: 'user_name'
          fill_in I18n.t('activerecord.attributes.user.email'), with: 'sample@example.com'
          fill_in I18n.t('activerecord.attributes.user.password'), with: 'password'
          fill_in I18n.t('activerecord.attributes.user.password_confirmation'), with: 'other_password'
          expect(page).to have_button I18n.t('defaults.register'), disabled: true
          expect(page).to have_content '入力したパスワードと一致しません'
          expect(page).to have_current_path signup_path
        end
      end
    end
  end

  describe 'ログイン後' do
    context 'ユーザー新規登録ページへアクセス' do
      it '投稿一覧ページへリダイレクトされること' do
        user = create(:user)
        login_as(user)
        expect(page).to have_content I18n.t('user_sessions.create.success')
        visit signup_path
        expect(page).to have_current_path photos_path
      end
    end
  end
end
