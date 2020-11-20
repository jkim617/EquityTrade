class Api::StocksController < ApplicationController
    
    def index
        @stocks = current_user.stocks
        # render :index
    end

    def create
        @stock = Stock.new(user_id: current_user, ticker: params[:ticker])

        if @stock.save
            # render :index
        else
            render json: ["Invalid move"]
        end

    end

    private
    def stock_params
        params.require(:stock).permit(:user_id, :ticker)



end

