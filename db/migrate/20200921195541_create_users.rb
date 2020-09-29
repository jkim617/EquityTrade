class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :session_token, null: false
      t.string :password_digest, null: false
      t.string :email, null: false
      t.string :fname, null: false
      t.string :lname, null: false
      t.float :funds, default: 0.00, null: false


      t.timestamps
    end
  end
end
