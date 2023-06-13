require 'rails_helper'

RSpec.describe 'StaticPages', type: :system do
  describe 'ログイン前' do
    context 'rootへアクセス' do
      it 'トップページが表示されること' do
        visit root_path
        expect(page).to have_current_path root_path
      end
    end
  end

  describe 'ログイン後' do
    context 'rootへアクセス' do
      it '投稿一覧ページへリダイレクトされること' do
        user = create(:user)
        login_as(user)
        expect(page).to have_content I18n.t('user_sessions.create.success')
        visit root_path
        expect(page).to have_current_path photos_path
      end
    end
  end
end
