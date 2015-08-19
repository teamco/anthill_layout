module UserLogsHelper

  def bind_events
    javascript_tag [
                       "var $table=$('##{controller_name}');",
                       "$table.find('td>span').on('click.toggleTr',function(){",
                       "var $span=$(this),$tr=$span.parents('tr:first').next();",
                       "if($tr.hasClass('hide')){",
                       "$tr.removeClass('hide');",
                       "$span.text('-');",
                       "var $params=$tr.find('li.user-params>div'),",
                       "$session=$tr.find('li.user-session>div');",
                       '$(prettyPrint(JSON.parse($params.text()))).appendTo($params.empty());',
                       '$(prettyPrint(JSON.parse($session.text()))).appendTo($session.empty());}',
                       'else{',
                       "$tr.addClass('hide');",
                       "$span.text('+');",
                       '}});'
                   ].join()
  end
end
