# == Schema Information
#
# Table name: user_logs
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  remote_addr     :string
#  session_id      :string
#  status          :integer
#  method          :string
#  controller      :string
#  action          :string
#  domain          :string
#  request_uri     :text
#  url             :text
#  request_format  :string
#  protocol        :string
#  host            :string
#  port            :string
#  user_params     :text
#  user_session    :text
#  query_string    :text
#  http_accept     :string
#  ssl             :boolean
#  xhr             :boolean
#  referer         :string
#  http_user_agent :string
#  server_software :string
#  content_type    :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class UserLog < ApplicationRecord

  include Base::ExternalLogger

  belongs_to :user, optional: true
  delegate :email, to: :user, prefix: true

  has_one :error_log, dependent: :destroy
  delegate :id, :message, to: :error_log, prefix: true

  def self.except(cname, aname)
    log_except = [
        {controller: 'user_logs', action: 'index'},
        {controller: 'error_logs', action: 'index'}
    ]
    log_except.each {|x| return false if (x[:action] == aname || aname.nil?) if (x[:controller] == cname)}
    true
  end

  def self.handle_log(request, response, cname, aname, user)

    opts = {
        remote_addr: request.remote_ip,
        session_id: request.session_options[:id],
        status: response.status,
        method: request.method,
        controller: cname,
        action: aname,
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
        request_format: request.format.to_json,
        ssl: request.ssl?,
        xhr: !request.xhr?.nil?,
        referer: request.env['HTTP_REFERER'],
        http_user_agent: request.headers['HTTP_USER_AGENT'],
        server_software: request.headers['SERVER_SOFTWARE'],
        content_type: response.media_type
    }

    if except(cname, aname)
      if user
        #user.user_logs.create!(opts)
      else
        #create!(opts)
      end
    end

    # rollbar(opts, 'log')

  end

  def self.fetch_data(user)
    user.user_logs.all.order('id DESC').includes(:error_log)
  end

end
