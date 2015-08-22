class Author::AuthorController < ApplicationController

  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  layout 'author'

  include Author

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :alert => exception.message
  end

  def index
    @author = {
        users: User.count,
        site_storages: current_user.author_site_storages.length,
        site_types: current_user.author_site_types.length,
        site_versions: current_user.author_site_versions.length,
        widget_categories: WidgetCategory.count,
        widgets: Widget.fetch_data(current_user).length,
        vulnerability_storage: current_user.vulnerability_storages.length,
        user_logs: current_user.user_logs.length,
        error_logs: current_user.error_logs.length
    }
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email, :password, :password_confirmation, roles: []) }
  end

end
