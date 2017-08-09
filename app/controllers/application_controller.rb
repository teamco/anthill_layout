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
    if is_localhost?
      logger.error "Status: #{status.inspect}"
      logger.error "Template: #{template.inspect}"
      raise e
    else
      log = ErrorLog.handle_error(current_user, e, @user_log)
      redirect_to error_log_path(log) and return
    end
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
    ) unless is_localhost?
  end

  def is_localhost?
    request.domain == 'localhost'
  end

  def respond_with_error
    respond_to do |format|
      format.html {redirect_to send("author_#{controller_name}_path"), notice: :error}
      format.json {render json: instance_variable_get("@author_#{controller_name.singularize}").errors, status: :unprocessable_entity}
    end
  end

  def respond_with_xhr(json_response)
    respond_to {|format| format.json {render json: json_response, status: t("success_#{action_name}")}}
  end

  def response_with_json_builder(json_response)
    @json_response = json_response
  end

  def respond_default
    respond_to do |format|
      format.html {redirect_to send("author_#{controller_name}_path"), notice: t("success_#{action_name}")}
      format.json {render "#{controller_name}/index", status: :ok, location: instance_variable_get("@author_#{controller_name.singularize}")}
    end
  end
end
