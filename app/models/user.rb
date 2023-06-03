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
class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :photos, dependent: :destroy

  validates :name, presence: true, length: { maximum: 20 }
  validates :email, presence: true, uniqueness: true

  enum role: { general: 0, admin: 1 }
end
