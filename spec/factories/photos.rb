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
FactoryBot.define do
  factory :photo do
    image { Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/example.jpg').to_s) }
    association :user
  end
end
