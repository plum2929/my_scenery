# == Schema Information
#
# Table name: users
#
#  id                            :bigint           not null, primary key
#  avatar                        :string
#  crypted_password              :string
#  email                         :string           not null
#  name                          :string           not null
#  new_post_notification_allowed :boolean          default(TRUE), not null
#  role                          :integer          default("general"), not null
#  salt                          :string
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'バリデーション' do
    context 'すべてのフィールドが有効な場合' do
      it '有効であること' do
        user = build(:user)
        expect(user).to be_valid
        expect(user.errors).to be_empty
      end
    end

    context 'ユーザー名がない場合' do
      it '無効であること' do
        user_without_name = build(:user, name: '')
        expect(user_without_name).to be_invalid
        expect(user_without_name.errors[:name]).to eq [I18n.t('errors.messages.blank')]
      end
    end

    context 'ユーザー名が21文字以上の場合' do
      it '無効であること' do
        user_with_long_name = build(:user, name: 'a' * 21)
        expect(user_with_long_name).to be_invalid
        expect(user_with_long_name.errors[:name]).to eq [I18n.t('errors.messages.too_long', count: 20)]
      end
    end

    context 'メールアドレスがない場合' do
      it '無効であること' do
        user_without_email = build(:user, email: '')
        expect(user_without_email).to be_invalid
        expect(user_without_email.errors[:email]).to include(I18n.t('errors.messages.blank'))
        expect(user_without_email.errors[:email]).to include(I18n.t('errors.messages.invalid'))
      end
    end

    context 'メールアドレスが不正な値の場合' do
      it '無効であること' do
        invalid_emails = %w[user@example,com user_at_foo.org user.name@example.foo@bar_baz.com foo@bar+baz.com]
        invalid_emails.each do |invalid_email|
          user_with_invalid_email = build(:user, email: invalid_email)
          expect(user_with_invalid_email).to be_invalid
          expect(user_with_invalid_email.errors[:email]).to eq [I18n.t('errors.messages.invalid')]
        end
      end
    end

    context 'メールアドレスがすでに存在する場合' do
      it '無効であること' do
        existing_user = create(:user)
        new_user = build(:user, email: existing_user.email)
        expect(new_user).to be_invalid
        expect(new_user.errors[:email]).to eq [I18n.t('errors.messages.taken')]
      end
    end

    context 'パスワードがない場合' do
      it '無効であること' do
        user_without_password = build(:user, password: '')
        expect(user_without_password).to be_invalid
        expect(user_without_password.errors[:password]).to eq [I18n.t('errors.messages.too_short', count: 8)]
      end
    end

    context 'パスワードがない場合' do
      it '無効であること' do
        user_without_password = build(:user, password: '')
        expect(user_without_password).to be_invalid
        expect(user_without_password.errors[:password]).to eq [I18n.t('errors.messages.too_short', count: 8)]
      end
    end

    context 'パスワードが8文字未満の場合' do
      it '無効であること' do
        user_with_short_password = build(:user, password: '')
        expect(user_with_short_password).to be_invalid
        expect(user_with_short_password.errors[:password]).to eq [I18n.t('errors.messages.too_short', count: 8)]
      end
    end

    context 'パスワードが17文字以上の場合' do
      it '無効であること' do
        user_with_long_password = build(:user, password: 'a' * 17)
        expect(user_with_long_password).to be_invalid
        expect(user_with_long_password.errors[:password]).to eq [I18n.t('errors.messages.too_long', count: 16)]
      end
    end

    context 'パスワード(確認)がない場合' do
      it '無効であること' do
        user_without_password_confirmation = build(:user, password_confirmation: '')
        expect(user_without_password_confirmation).to be_invalid
        expect(user_without_password_confirmation.errors[:password_confirmation]).to include(I18n.t('errors.messages.blank'))
        expect(user_without_password_confirmation.errors[:password_confirmation]).to include(I18n.t('errors.messages.confirmation', attribute: User.human_attribute_name(:password)))
      end
    end

    context 'パスワードとパスワード(確認)が一致しない場合' do
      it '無効であること' do
        user_with_different_passwords = build(:user, password: 'password', password_confirmation: 'password_confirmation')
        expect(user_with_different_passwords).to be_invalid
        expect(user_with_different_passwords.errors[:password_confirmation]).to eq [I18n.t('errors.messages.confirmation', attribute: User.human_attribute_name(:password))]
      end
    end
  end
end
