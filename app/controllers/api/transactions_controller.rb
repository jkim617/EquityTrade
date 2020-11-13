

class Api::TransactionsController < ApplicationController
    def index
        @transactions = current_user.transactions
        render :index
    end

    def create

        @transaction = Transaction.new(user_id: params[:user_id], ticker: params[:ticker], price: params[:price], num_shares: params[:num_shares], order_type: params[:order_type])
        if @transaction.save
            if @transaction.order_type == "buy"
                current_balance = current_user.funds - (@transaction.price * @transaction.num_shares)
            else
                current_balance = current_user.funds + (@transaction.price * @transaction.num_shares)
            end

            current_user.update(funds: current_balance)
            @transactions = current_user.transactions
            render :index
        else
            render json: ["Invalid transaction"]
        end    
    end
    
    private
    def transaction_params
        params.require(:transaction).permit(:user_id, :stock_id, :price, :num_shares, :order_type)
    end


end
