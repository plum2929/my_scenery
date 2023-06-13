class StaticPagesController < ApplicationController
  skip_before_action :require_login

  def top
    redirect_to photos_path if logged_in?
  end
end
