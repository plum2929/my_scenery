class ApplicationController < ActionController::Base
  include Pagy::Backend

  before_action :require_login
  add_flash_types :info, :success, :warning


  private

  def not_authenticated
    redirect_to login_path, warning: t('defaults.require_login')
  end

  def no_login_required
    redirect_to photos_path if logged_in?
  end
end
