class Api::ListsController < ApplicationController
    
    def index
        @lists = current_user.lists
        render :index
    end

    def create
        @list = List.new(user_id: current_user, ticker: params[:ticker])

        if @list.save
            render :index
        else
            render json: ["Invalid move"]
        end

    end

    private
    def list_params
        params.require(:list).permit(:user_id, :ticker)



end

