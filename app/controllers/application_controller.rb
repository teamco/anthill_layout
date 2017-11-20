class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout :layout_by_resource

  before_action :set_current_user
  before_action :update_user_log

  rescue_from ActiveRecord::RecordNotFound, with: :error
  rescue_from ArgumentError, with: :error
  rescue_from Exception, with: :error
  rescue_from OAuth::Unauthorized, with: :error
  rescue_from ActionController::RoutingError, with: :not_found

  def raise_not_found
    raise ActionController::RoutingError.new("No route matches #{params[:unmatched_route]}")
  end

  protected

  def set_current_user
    User.current = current_user
  end

  def not_found(e)
    handle_error(e, :not_found, 404)
  end

  def error(e)
    handle_error(e, :internal_server_error, 500)
  end

  def layout_by_resource
    devise_controller? ? 'author' : 'application'
  end

  private

  def handle_error(e, status, template)
    # if localhost?
      logger.error "Status: #{status.inspect}"
      logger.error "Template: #{template.inspect}"
      raise e
    # else
    #   log = ErrorLog.handle_error(current_user, e, @user_log)
    #   raise e if error_logs?
    #   redirect_to error_log_path(log)
    # end
  end

  def current_user
    super
  end

  def update_user_log
    @user_log = UserLog.handle_log(
        request,
        response,
        controller_name,
        action_name,
        current_user
    ) unless localhost?
  end

  def error_logs?
    controller_name == 'error_logs'
  end

  def localhost?
    request.domain == 'localhost'
  end
end
