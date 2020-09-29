# == Schema Information
#
# Table name: stocks
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  ticker     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Stock < ApplicationRecord

    validates :name, :ticker, presence: true
    validates :ticker, uniqueness: true

    has_many :transactions,
        primary_key: :id,
        foreign_key: :stock_id,
        class_name: :Transaction
end
