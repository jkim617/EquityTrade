class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: [
        'Please enter your first name.',
        'Please enter your last name.',
        'Please enter your username',
        'Please enter your email.',
        'Your password must be at least 10 characters.'
      ], status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :fname, :lname)
  end
end
