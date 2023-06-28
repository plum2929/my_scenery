# == Schema Information
#
# Table name: photos
#
#  id         :bigint           not null, primary key
#  image      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_photos_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Photo < ApplicationRecord
  belongs_to :user
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  mount_uploader :image, ImageUploader

  validates :image, presence: true

  def save_with_tags(tag_params)
    tag_names = tag_params.dig(:tag_names).split(',').uniq
    valid = true
    ActiveRecord::Base.transaction do
      self.tags = tag_names.map { |name| Tag.find_or_initialize_by(name: name.strip) }
      valid &= save
      raise ActiveRecord::Rollback unless valid
    end
    valid
  end
end
