# == Schema Information
#
# Table name: transactions
#
#  id               :bigint           not null, primary key
#  stock_id         :integer          not null
#  user_id          :integer          not null
#  num_shares       :integer          not null
#  order_type       :string           not null
#  price            :float            not null
#  transaction_time :datetime
#
class Transaction < ApplicationRecord

    validates :stock_id, :user_id, :num_shares, :order_type, :price, presence: true
    
    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :stock,
        primary_key: :id,
        foreign_key: :stock_id,
        class_name: :Stock

end
