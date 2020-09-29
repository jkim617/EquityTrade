class Api::TransactionsController < ApplicationController
    def index
        @transactions = current_user.transactions
        render :index
    end

    def create
        @transaction = Transaction.new(transaction_params)
        if @transaction.save
            if @transaction.order_type == "buy"
                current_balance = current_user.funds - @transaction.price
            else
                current_balance = current_user.funds + @transaction.price
            end

            current_user.update(funds: current_balance)
            render "/api/transactions/show"
        else
            render json: ["Invalid transaction"]
        end    
    end
    
    private
    def transaction_params
        params.require(:transaction).permit(:user_id, :stock_id, :price, :num_shares, :order_type, :transaction_time)
    end


end
