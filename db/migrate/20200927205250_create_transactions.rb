class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :ticker, null: false
      t.integer :user_id, null: false
      t.integer :num_shares, null: false
      t.string :order_type, null: false
      t.float :price, null: false

      t.datetime

    end
  end
end
