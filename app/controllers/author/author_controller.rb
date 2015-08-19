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
        site_storages: SiteStorage.count,
        site_types: SiteType.count,
        site_versions: SiteVersion.count,
        widget_categories: WidgetCategory.count,
        widgets: Widget.count,
        vulnerability_storage: VulnerabilityStorage.count,
        user_logs: UserLog.count,
        error_logs: ErrorLog.count
    }
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email, :password, :password_confirmation, roles: []) }
  end

end
