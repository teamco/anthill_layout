class Author::AuthorController < ApplicationController

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  layout 'author'

  include Author

  rescue_from CanCan::AccessDenied do |exception|
    flash[:error] = exception.message
    redirect_to root_url
  end

  def index
    @author = Author.fetch_data(current_user)
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email, :password, :password_confirmation, roles: []) }
  end

end
