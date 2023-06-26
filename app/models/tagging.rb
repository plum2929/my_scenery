# == Schema Information
#
# Table name: taggings
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  photo_id   :bigint           not null
#  tag_id     :bigint           not null
#
# Indexes
#
#  index_taggings_on_photo_id             (photo_id)
#  index_taggings_on_photo_id_and_tag_id  (photo_id,tag_id) UNIQUE
#  index_taggings_on_tag_id               (tag_id)
#
# Foreign Keys
#
#  fk_rails_...  (photo_id => photos.id)
#  fk_rails_...  (tag_id => tags.id)
#
class Tagging < ApplicationRecord
  belongs_to :tag
  belongs_to :photo

  validates :tag_id, uniqueness: { scope: :photo_id }
end
