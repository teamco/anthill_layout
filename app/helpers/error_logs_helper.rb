module ErrorLogsHelper

  def error_th
    th(%w(ID Name Cause Exception Date))
  end

  def error_td(error_log, expand='')
    [
        "<tr><td class=\"nw\">",
        "#{expand}#{error_log.id}</td><td>#{error_log.name}</td>",
        "<td class=\"name\">#{error_log.message}</td>",
        "<td>#{error_log.exception}</td>",
        "<td class=\"nw c\">#{error_log.created_at.strftime('%Y %b %d %I:%M:%S %p')}</td></tr>"
    ].join.html_safe
  end

  def error_trace(error_log, hide='')
    [
        "<tr#{hide}><td colspan=\"5\">",
        '<ul><li><span>User log</span>',
        "#{link_to error_log.user_log.id, {controller: :user_logs, action: :show, id: error_log.user_log.id}}",
        "</li><li class=\"backtrace\">",
        "<span>Backtrace</span><div>#{json_pre(error_log.backtrace)}</div></li>",
        '</ul></td></tr>'
    ].join.html_safe
  end

end
