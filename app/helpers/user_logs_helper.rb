module UserLogsHelper

  def user_log_th
    th(%w(ID User Method Url Date))
  end

  def user_log_td(user_log, expand='')
    [
        "<tr#{user_log.error_log.nil? ? '' : ' class=danger'}><td class=\"nw\">",
        "#{expand}#{user_log.id}</td>",
        "<td class=\"name\">#{link_to user_log.user_email, 'user_log.user.id' unless user_log.user.nil?}</td>",
        "<td>#{user_log.method}</td>",
        "<td>#{link_to nil, user_log.request_uri}</td>",
        "<td class=\"nw c\">#{user_log.created_at.strftime('%Y %b %d %I:%M:%S %p')}</td></tr>"
    ].join.html_safe
  end

  def user_log_trace(user_log, hide='')
    [
        "<tr#{hide}><td colspan=\"5\"><ul>",
        "<li><span class=\"label label-default\">Id</span>#{link_to nil, user_log_path(user_log)}</li>",
        '<li><span class="label label-default">Error log</span>',
        "#{link_to user_log.error_log_message, error_log_path(user_log.error_log) if user_log.error_log}",
        "</li><li><span class=\"label label-default\">User</span>#{user_log.user_email unless user_log.user.nil?}</li>",
        "<li><span class=\"label label-default\">Remote address</span>#{user_log.remote_addr}</li>",
        "<li><span class=\"label label-default\">Status</span>#{user_log.status}</li>",
        "<li><span class=\"label label-default\">Method</span>#{user_log.method}</li>",
        "<li><span class=\"label label-default\">Controller</span>#{user_log.controller}</li>",
        "<li><span class=\"label label-default\">Action</span>#{user_log.action}</li>",
        "<li><span class=\"label label-default\">Domain</span>#{user_log.domain}</li>",
        '<li><span class="label label-default">Request Uri</span>',
        "#{user_log.protocol}#{user_log.host}:#{user_log.port}",
        "#{link_to nil, user_log.request_uri}",
        "</li><li><span class=\"label label-default\">Query string</span>#{user_log.query_string}</li>",
        "<li><span class=\"label label-default\">Http accept</span>#{user_log.http_accept}</li>",
        "<li><span class=\"label label-default\">Format</span>#{user_log.request_format}</li>",
        "<li><span class=\"label label-default\">SSL</span>#{user_log.ssl}</li>",
        "<li><span class=\"label label-default\">XHR</span>#{user_log.xhr}</li>",
        "<li><span class=\"label label-default\">Referer</span>#{link_to nil, user_log.referer}</li>",
        "<li><span class=\"label label-default\">Http user agent</span>#{user_log.http_user_agent}</li>",
        "<li><span class=\"label label-default\">Server version</span>#{user_log.server_software}</li>",
        "<li><span class=\"label label-default\">Content type</span>#{user_log.content_type}</li>",
        "<li><span class=\"label label-default\">Created at</span>#{user_log.created_at.strftime('%Y %b %d %I:%M:%S %p')}</li>",
        "<li class=\"user-params\">",
        "<span class=\"label label-default\">Params</span><div class=\"params\">#{user_log.user_params}</div></li>",
        "<li class=\"user-session\"><span class=\"label label-default\">Session</span>",
        "<div class=\"params\">#{user_log.user_session}</div>",
        '</li></ul></td></tr>'
    ].join.html_safe
  end
end
