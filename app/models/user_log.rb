class UserLog < ActiveRecord::Base

  belongs_to :user
  has_one :error_log

  def self.list(opts)
    sort = "#{opts[:sort]} #{opts[:dir]}"
    sort = sort.strip.length > 0 ? sort : 'created_at DESC'
    logs = self.all.order(sort)

    log_map = []
    log_map = logs.map do |x|
      {
          id: x.id,
          user_id: x.user.try(:login),
          remote_addr: x.remote_addr,
          session_id: x.session_id,
          status: x.status,
          method: x.method,
          controller: x.controller,
          action: x.action,
          domain: x.domain,
          request_uri: x.request_uri,
          url: x.url,
          protocol: x.protocol,
          host: x.host,
          port: x.port,
          user_params: self.json_pre(x.user_params),
          user_session: self.json_pre(x.user_session),
          query_string: x.query_string,
          http_accept: x.http_accept,
          format: Item.json_pre(x.format),
          ssl: x.ssl,
          xhr: x.xhr,
          referer: x.referer,
          http_user_agent: x.http_user_agent,
          server_software: x.server_software,
          content_type: x.content_type,
          created_at: x.updated_at.strftime('%Y %b %d'),
          updated_at: x.updated_at.strftime('%Y %b %d %I:%M:%S %p'),
      }
    end unless logs.empty?

    log_map

  end

  def self.json_pre(json)
    "<pre><code>#{JSON.pretty_generate(JSON.parse(json))}</code></pre>"
  end

  def self.except(cname, aname)
    log_except = [
        {controller: 'user_logs', action: 'index'}
    ]
    log_except.each { |x| return false if (x[:action] == aname || aname.nil?) if (x[:controller] == cname) }
    true
  end

end
