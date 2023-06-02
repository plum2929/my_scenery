class SorceryCore < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string  :name, null: false
      t.string  :email, null: false, index: { unique: true }
      t.string  :crypted_password
      t.string  :salt
      t.string  :avatar
      t.boolean :new_post_notification_allowed, default: true, null: false
      t.integer :role, default: 0, null: false

      t.timestamps null: false
    end
  end
end
