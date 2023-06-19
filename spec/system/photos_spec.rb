require 'rails_helper'

RSpec.describe 'Photos', type: :system do
  let(:user) { create(:user) }
  let(:photo) { create(:photo, user:) }

  describe 'ログイン前' do
    describe '投稿一覧' do
      context '投稿が存在しない' do
        it '「まだ投稿がありません」と表示される' do
          visit photos_path
          expect(page).to have_content 'まだ投稿がありません'
          expect(page).to have_current_path photos_path
        end
      end

      context '投稿が存在する' do
        it '投稿一覧が表示される' do
          photo
          visit photos_path
          expect(page).to have_selector "img[src$='example.jpg']"
          expect(page).to have_current_path photos_path
        end
      end
    end
  end

  describe 'ログイン後' do
    before { login_as(user) }

    describe '投稿一覧' do
      context '投稿が存在しない' do
        it '「まだ投稿がありません」と表示される' do
          visit photos_path
          expect(page).to have_content 'まだ投稿がありません'
          expect(page).to have_current_path photos_path
        end
      end

      context '投稿が存在する' do
        it '投稿一覧が表示される' do
          photo
          visit photos_path
          expect(page).to have_selector "img[src$='example.jpg']"
          expect(page).to have_current_path photos_path
        end
      end
    end
  end
end
