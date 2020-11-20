class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.string :ticker, null: false
      t.integer :user_id, null: false
    end
  end
end
