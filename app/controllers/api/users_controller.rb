class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: [
        {fname: 'Please enter your first name.',
        lname: 'Please enter your last name.',
        username: 'Please enter your username',
        email: 'Please enter your email.',
        password: 'Your password must be at least 10 characters.'
        }
      ], status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :fname, :lname)
  end
end
