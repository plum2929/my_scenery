class CreateTaggings < ActiveRecord::Migration[7.0]
  def change
    create_table :taggings do |t|
      t.references :tag, null: false, foreign_key: true
      t.references :photo, null: false, foreign_key: true

      t.timestamps
    end
    add_index :taggings, [:photo_id, :tag_id], unique: true
  end
end
