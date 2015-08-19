class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :update_user_log

  layout :layout_by_resource

  protected

  def layout_by_resource
    if devise_controller?
      'author'
    else
      'application'
    end
  end

  def current_user
    super
  end

  def update_user_log

    opts = {
        remote_addr: request.remote_ip,
        session_id: request.session_options[:id],
        status: response.status,
        method: request.method,
        controller: controller_name,
        action: action_name,
        domain: request.domain,
        request_uri: request.fullpath,
        url: request.url,
        protocol: request.protocol,
        host: request.host,
        port: request.port,
        user_params: request.params.to_json,
        user_session: request.session.to_json,
        query_string: request.query_string,
        http_accept: request.headers['HTTP_ACCEPT'],
        format: request.format.to_json,
        ssl: request.ssl?,
        xhr: !request.xhr?.nil?,
        referer: request.env['HTTP_REFERER'],
        http_user_agent: request.headers['HTTP_USER_AGENT'],
        server_software: request.headers['SERVER_SOFTWARE'],
        content_type: response.content_type
    }

    (current_user ?
        current_user.user_logs.create!(opts) :
        UserLog.create!(opts)) if UserLog.except(controller_name, action_name)
  end

end
