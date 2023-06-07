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
FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "name#{n}" }
    sequence(:email) { |n| "sample#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
