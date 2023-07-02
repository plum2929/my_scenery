# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_tags_on_name  (name) UNIQUE
#
class Tag < ApplicationRecord
  has_many :taggings, dependent: :destroy
  has_many :photos, through: :taggings

  validates :name, presence: true, uniqueness: true

  def self.all_names
    order(:name).to_json(only: :name)
  end
end
