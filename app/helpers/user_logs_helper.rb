module UserLogsHelper

  def user_th
    '<tr><th>ID</th><th>User</th><th>Method</th><th>Url</th><th>Date</th></tr>'.html_safe
  end

  def user_td(user_log, expand='')
    [
        "<tr#{user_log.error_log.nil? ? '' : ' class=error'}><td class=\"nw c\">",
        "#{expand}#{user_log.id}</td>",
        "<td class=\"name\">#{link_to user_log.user_email, 'user_log.user.id' unless user_log.user.nil?}</td>",
        "<td>#{user_log.method}</td>",
        "<td>#{user_log.request_uri}</td>",
        "<td class=\"nw c\">#{user_log.created_at.strftime('%Y %b %d %I:%M:%S %p')}</td></tr>"
    ].join.html_safe
  end

  def user_trace(user_log, hide='')
    [
        "<tr#{hide}><td colspan=\"5\"><ul>",
        "<li><span>Id</span>#{link_to user_log_path(user_log), user_log_path(user_log)}</li>",
        '<li><span>Error log</span>',
        "#{link_to user_log.error_log_message, "#{error_logs_path}/#{user_log.error_log_id}" if user_log.error_log}",
        "</li><li><span>User</span>#{user_log.user_email unless user_log.user.nil?}</li>",
        "<li><span>Remote address</span>#{user_log.remote_addr}</li>",
        "<li><span>Status</span>#{user_log.status}</li>",
        "<li><span>Method</span>#{user_log.method}</li>",
        "<li><span>Controller</span>#{user_log.controller}</li>",
        "<li><span>Action</span>#{user_log.action}</li>",
        "<li><span>Domain</span>#{user_log.domain}</li>",
        '<li><span>Request Uri</span>',
        "#{user_log.protocol}#{user_log.host}:#{user_log.port}#{user_log.request_uri}/#{user_log.action}",
        "</li><li><span>Query string</span>#{user_log.query_string}</li>",
        "<li><span>Http accept</span>#{user_log.http_accept}</li>",
        "<li><span>SSL</span>#{user_log.ssl}</li>",
        "<li><span>XHR</span>#{user_log.xhr}</li>",
        "<li><span>Referer</span>#{user_log.referer}</li>",
        "<li><span>Http user agent</span>#{user_log.http_user_agent}</li>",
        "<li><span>Server version</span>#{user_log.server_software}</li>",
        "<li><span>Content type</span>#{user_log.content_type}</li>",
        "<li><span>Created at</span>#{user_log.created_at.strftime('%Y %b %d %I:%M:%S %p')}</li>",
        "<li class=\"user-params\">",
        "<span>Params</span><div>#{user_log.user_params}</div></li>",
        "<li class=\"user-session\"><span>Session</span>",
        "<div>#{user_log.user_session}</div>",
        '</li></ul></td></tr>'
    ].join.html_safe
  end
end
