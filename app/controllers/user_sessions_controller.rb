class UserSessionsController < ApplicationController
  skip_before_action :require_login, only: %i[new create]

  def new
    @user = User.new
  end

  def create
    @user = login(user_params[:email], user_params[:password])

    if @user
      redirect_back_or_to photos_path
    else
      @user = User.new(user_params)
      @error_message = t('user_sessions.create.error_message')
      render :new, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
