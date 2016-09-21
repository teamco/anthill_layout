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

  def handle_error(e, status, template)
    puts ">>> Error: #{e.inspect}"
    logger.info ">>> Error: #{e.inspect}"
    super if self.methods.include? 'super'
    unless request.domain == 'localhost'
      log = ErrorLog.handle_error(current_user, e, @user_log)
      redirect_to error_log_path(log) and return
    end
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
    @user_log = UserLog.handle_log(
        request,
        response,
        controller_name,
        action_name,
        current_user
    ) unless request.domain == 'localhost'
  end

end
