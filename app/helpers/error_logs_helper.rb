module ErrorLogsHelper

  def error_log_th
    th(%w(ID Exception Date))
  end

  def error_log_td(error_log, expand='')
    [
        "<tr><td class=\"nw\">",
        "#{expand}#{error_log.try(:id)}</td>",
        "<td><span class=\"break\">#{error_log.exception}</span></td>",
        "<td class=\"nw c\">#{error_log.created_at.strftime('%Y %b %d %I:%M:%S %p')}</td></tr>"
    ].join.html_safe
  end

  def error_log_trace(error_log, hide='')
    [
        "<tr#{hide}><td colspan=\"5\">",
        "<ul><li><span class=\"label label-default\">Request Uri</span>#{link_to nil, error_log.user_log.request_uri}</li>",
        '<li><span class="label label-default">User log</span>',
        "#{link_to error_log.user_log.id, user_log_path(error_log.user_log)}",
        "</li><li><span class=\"label label-default\">Cause</span>#{error_log.message}</li>",
        "<li><span class=\"label label-default\">Error name</span>#{error_log.name}</li>",
        "<li class=\"backtrace\">",
        "<span class=\"label label-default\">Backtrace</span><div>#{json_pre(error_log.backtrace)}</div></li>",
        '</ul></td></tr>'
    ].join.html_safe
  end

end
