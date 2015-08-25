class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :update_user_log

  layout :layout_by_resource

  rescue_from ActiveRecord::RecordNotFound, with: :error
  rescue_from Exception, with: :error
  rescue_from OAuth::Unauthorized, with: :error
  rescue_from ActionController::RoutingError, with: :not_found

  def raise_not_found
    raise ActionController::RoutingError.new("No route matches #{params[:unmatched_route]}")
  end

  protected

  def not_found(e)
    handle_error(e)
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: false, status: :not_found }
      format.xml { head :not_found }
      format.any { head :not_found }
    end
  end

  def error(e)
    handle_error(e)
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/500", layout: false, status: :error }
      format.xml { head :not_found }
      format.any { head :not_found }
    end
  end

  def handle_error(e)
    logger.info e.inspect
    ErrorLog.handle_error(current_user, e)
  end

  def layout_by_resource
    if devise_controller?
      'author'
    else
      'application'
    end
  end

  private

  def current_user
    super
  end

  def update_user_log
    UserLog.handle_log(request, response, controller_name, action_name, current_user)
  end

end
