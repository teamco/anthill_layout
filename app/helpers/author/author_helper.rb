module Author::AuthorHelper

  def is_development?(mode)
    mode == 'development'
  end

  def is_consumption?(mode)
    mode == 'consumption'
  end

  def get_development
    get_site_type('development')
  end

  def get_consumption
    get_site_type('consumption')
  end

  def get_authoring
    get_site_type('authorize')
  end

  def get_test
    get_site_type('test')
  end

  def is_action?(action)
    action_name == action
  end

  def is_new?
    is_action? 'new'
  end

  def is_edit?
    is_action? 'edit'
  end

  def th(names=[])
    "<tr>#{names.map { |n| "<th>#{n}</th>" }.join}</tr>".html_safe
  end

  def link_to_icon(url, title, icon, target=nil, method=:get)
    link_to url, title: title, target: target, method: method do
      concat "<i class=\"glyphicon #{icon}\"></i>".html_safe
      concat title
    end
  end

  def link_to_destroy(item, name, destroy_path=nil, style='btn btn-danger')
    title = controller_name.humanize.singularize.downcase
    link_to (destroy_path.nil? ?
      send("author_#{controller_name.singularize}_path", item) :
      destroy_path),
      class: style,
      method: :delete,
      data: { confirm: "#{t('delete_confirm', item: title, name: name)}" } do
      "<i class=\"glyphicon glyphicon-trash\"></i>#{t('delete', item: nil)}".html_safe
    end
  end

  def link_to_edit(item, edit_path=nil, style='btn btn-default', method=:get)
    link_to (edit_path.nil? ?
      send("edit_author_#{controller_name.singularize}_path", item) :
      edit_path),
      title: t('edit'),
      method: method,
      class: style do
        "<i class=\"glyphicon glyphicon-pencil\"></i>#{t('edit')}".html_safe
      end
  end

  def render_loop(collection, partial)
    collection.blank? ?
      (concat "<p class=\"no-data\">#{t('no_data_in_collection', items: controller_name.gsub(/_controller/, '').titleize.humanize)}</p>".html_safe) :
      collection.each { |item| concat render partial, item: item }
  end

  def render_title
    content_tag(:div, class: 'title') do
    end unless controller_name == 'author'
  end

  def render_text_field(f, name, disabled=false)
    render_field(:text_field, f, name, disabled)
  end

  def render_text(name, value)
    content_tag(:div, class: 'input-group') do
      concat label_tag name, nil, class: 'input-group-addon text-left'
      concat text_field_tag(name, value, { disabled: true, class: 'form-control' })
    end
  end

  def render_text_area(f, name, disabled=false)
    render_field(:text_area, f, name, disabled)
  end

  def render_field_tag(type, name, value, disabled=false, autofocus=false)
    content_tag(:div, class: 'input-group') do
      concat label_tag name, nil, class: 'input-group-addon text-left'
      concat send(type, name, value,
        disabled: disabled,
        autofocus: autofocus,
        class: 'form-control',
        placeholder: "Enter #{name.to_s.humanize}"
      )
    end
  end

  def render_checkbox(f, name, disabled=false)
    content_tag(:div, class: 'input-group') do
      concat render_group_field(:check_box, f, name, disabled)
      concat text_field_tag(name, name, disabled: true, class: 'form-control')
    end
  end

  def render_radio_button(f, name, value, checked=false, disabled=false)
    content_tag(:div, class: 'field') do
      concat f.radio_button(name, value, { disabled: disabled, checked: checked })
      concat f.label name
    end
  end

  def render_group_field(type, f, name, disabled)
    content_tag(:span, nil, class: 'input-group-addon') do
      concat f.send(type, name, disabled: disabled)
    end
  end

  def render_number_field(f, name, disabled=false, autofocus=false, css='col-xs-6')
    render_field(:number_field, f, name, disabled, autofocus, css)
  end

  def render_collection_field(f, name, opts)
    content_tag(:div, class: 'input-group') do
      concat f.label opts[:id], name, class: 'input-group-addon text-left'
      concat f.collection_select(opts[:id], opts[:collection], opts[:index], opts[:value], opts[:html] || {}, { class: 'form-control' })
    end unless opts[:collection].nil?
  end

  def render_select_field(f, name, opts)
    content_tag(:div, class: 'input-group') do
      concat f.label opts[:id], name, class: 'input-group-addon text-left'
      concat f.select(opts[:id], opts[:collection], opts[:html] || {}, { class: 'form-control' })
    end unless opts[:collection].nil?
  end

  def render_submit(f)
    f.submit nil, class: 'btn btn-warning'
  end

  def cancel_button(**args)
    name = args[:name] || t('cancel')
    redirect_url = args[:redirect_url] || send("author_#{controller_name}_path")
    link_to name, redirect_url, title: t('cancel'), class: 'btn btn-default'
  end

  def render_notification(item)
    content_tag(:div, class: 'error_explanation') do
      concat content_tag(:h2, "#{pluralize(item.errors.count, 'error')}: prohibited this item from being saved:")
      concat content_tag(:ul, item.errors.full_messages.collect { |message| "<li>#{message}</ li>" }.join.html_safe)
    end if item.errors.any?
  end

  def render_form
    content_tag(:div) do
      concat render partial: "/author/#{controller_name}/form",
        locals: {
          item: instance_variable_get("@author_#{controller_name.singularize}"),
          types: @author_site_types
        }
    end
  end

  private

  def render_field(type, f, name, disabled, autofocus=false, css='')
    content_tag(:div, class: "input-group #{css}") do
      concat f.label name, class: 'input-group-addon text-left'
      concat f.send(type, name, disabled: disabled, autofocus: autofocus,
        class: 'form-control', placeholder: "Enter #{name.to_s.humanize}")
    end
  end

  def add_new_black_list
    %w(site_versions)
  end

  def edit_user(item)
    email = item.user.email
    email = link_to(email, edit_user_registration_path) if email == current_user.email
    "#{email} (#{item.user.role.name.humanize})".html_safe
  end

  def render_json(content, selector, compressed=true, load=true)
    content_tag(:div, class: 'json-view') do
      concat load_pretty_print(compressed)
      concat pretty_print(content, selector, compressed) if load
    end
  end

  def load_pretty_print(compressed)
    if compressed
      javascript_include_tag 'scripts/core/lib/lz-string.js', 'scripts/core/lib/packages/pretty.print.js'
    else
      javascript_include_tag 'scripts/core/lib/packages/pretty.print.js'
    end
  end

  def pretty_print(content, selector = '.json-view', compressed)
    javascript_tag compressed ?
      "$(prettyPrint(JSON.parse(LZString.decompressFromBase64('#{content}')))).appendTo('#{selector}');".html_safe :
      "$(prettyPrint(JSON.parse('#{content}'))).appendTo('#{selector}');".html_safe
  end

  def json_pre(json)
    "<pre><code>#{JSON.pretty_generate(JSON.parse(json))}</code></pre>".html_safe
  end

  def bind_events(selectors = [], force = nil)
    pretty_print = selectors.map { |x| "$param=$tr.find('li#{x}>div');$(prettyPrint(JSON.parse($param.text()))).appendTo($param.empty());" }
    javascript_tag [
      "var $table=$('##{controller_name}');",
      "$table.find('td>span').on('click.toggleTr',function(){",
      "var $span=$(this),$tr=$span.parents('tr:first').next();",
      "if($tr.hasClass('hide')){",
      "$tr.removeClass('hide');",
      "$span.removeClass('glyphicon-plus').addClass('glyphicon-minus');",
      'var $param;',
      pretty_print.join,
      '}else{',
      "$tr.addClass('hide');",
      "$span.removeClass('glyphicon-minus').addClass('glyphicon-plus');",
      '}});',
      "#{'$table.find(\'td>span\').trigger(\'click.toggleTr\')' unless force.nil? }"
    ].join
  end

  def published(item)
    item.get_published_version.version rescue '?'
  end

  def activated(item)
    item.get_activated_version.version rescue '?'
  end

  private

  def get_site_type(mode)
    Author::SiteType.where(name: mode).first
  end

end
