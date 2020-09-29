@transactions.each do |transaction|
    json.set! transaction.id do
        json.extract! transaction, :id, :user_id, :ticker, :num_shares, :order_type, :price
    end
end