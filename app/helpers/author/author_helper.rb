module Author::AuthorHelper

  def development
    site_type('development')
  end

  def consumption
    site_type('consumption')
  end

  def authoring
    site_type('authorize')
  end

  def test
    site_type('test')
  end

  def action?(action)
    action_name == action
  end

  def new?
    action? 'new'
  end

  def edit?
    action? 'edit'
  end

  def new_url
    send("new_author_#{controller_name.singularize}_path")
  end

  def th(names = [])
    "<tr>#{names.map { |n| "<th scope=\"col\">#{n}</th>" }.join}</tr>".html_safe
  end

  def link_to_icon(url, title, icon, css = '', icon_float = 'none', target =
      nil, method = :get)
    link_to url, title: title, target: target, class: css, method: method do
      concat "<i class=\"fa #{icon} float-#{icon_float}\"></i>".html_safe
      concat title
    end
  end

  def link_to_destroy(item, name, destroy_path = nil, style = '')
    title = controller_name.humanize.singularize.downcase
    link_to (destroy_path.nil? ?
        send("author_#{controller_name.singularize}_path", item) :
        destroy_path),
        class: style,
        method: :delete,
        data: {confirm: "#{t('delete_confirm', item: title, name: name)}"} do
      "<i class=\"fa fa-trash\"></i>#{t('delete', item: nil)}".html_safe
    end
  end

  def link_to_edit(item, edit_path = nil, style = '', method = :get)
    link_to (edit_path.nil? ?
        send("edit_author_#{controller_name.singularize}_path", item) : edit_path),
        title: t('edit'),
        method: method,
        class: style do
          "<i class=\"fa fa-edit\"></i>#{t('edit')}".html_safe
        end
  end

  def render_loop(collection, partial)
    if collection.blank?
      (concat "<p class=\"no-data\">#{t('no_data_in_collection', items: controller_name.gsub(/_controller/, '').titleize.humanize)}</p>".html_safe)
    else
      collection.each_with_index do |item, index|
        concat render partial, item: item, index: index
      end
    end
  end

  def render_title
    content_tag(:div, class: 'title') do
    end unless controller_name == 'author'
  end

  def render_text_field(f, name, disabled = false)
    render_field(:text_field, f, name, disabled)
  end

  def render_text(name, value)
    content_tag(:div, class: 'input-group') do
      concat label_tag name, nil, class: 'input-group-addon text-left'
      concat text_field_tag(name, value, {disabled: true, class: 'form-control'})
    end
  end

  def render_text_area(f, name, disabled = false)
    render_field(:text_area, f, name, disabled)
  end

  def render_field_tag(type, name, value, disabled = false, autofocus = false)
    content_tag(:div, class: 'form-group') do
      concat label_tag name, nil
      concat send(type, name, value,
          disabled: disabled,
          autofocus: autofocus,
          class: 'form-control',
          'aria-describedby': "#{name}-help",
          placeholder: "Enter #{name.to_s.humanize}"
      )
      concat content_tag :small,
          'Encrypted content parsed below',
          id: "#{name}-help",
          class: 'form-text text-muted'
    end
  end

  def render_checkbox(f, name, disabled = false)
    content_tag(:div, class: 'input-group mb-1') do
      concat render_group_field(:check_box, f, name, disabled)
      concat text_field_tag(name, name.to_s.humanize, disabled: true, class: 'form-control')
    end
  end

  def render_radio_button(f, name, value, checked = false, disabled = false)
    content_tag(:div, class: 'field') do
      concat f.radio_button(name, value, {disabled: disabled, checked: checked})
      concat f.label name
    end
  end

  def render_group_field(type, f, name, disabled)
    content_tag(:div, nil, class: 'input-group-prepend') do
      content_tag(:div, nil, class: 'input-group-text') do
        concat f.send(type, name, disabled: disabled)
      end
    end
  end

  def render_number_field(f, name, disabled = false, autofocus = false, css = 'col-xs-6')
    render_field(:number_field, f, name, disabled, autofocus, css)
  end

  def render_collection_field(f, name, opts)
    "<div class=\"input-group mb-1\">
      <div class=\"input-group-prepend\">
        <div class=\"input-group-text\">#{f.label opts[:id], name, class: 'm-0'}</div>
      </div>
      #{f.collection_select(opts[:id], opts[:collection], opts[:index], opts[:value], opts[:html] || {}, {class: 'form-control'})}
    </div>".html_safe unless opts[:collection].nil?
  end

  def render_select_field(f, name, opts)
    "<div class=\"input-group mb-1\">
      <div class=\"input-group-prepend\">
        <div class=\"input-group-text\">#{f.label opts[:id], name, class: 'm-0'}</div>
      </div>
      #{f.select(opts[:id], opts[:collection], opts[:html] || {}, {class: 'form-control'})}
    </div>".html_safe unless opts[:collection].nil?
  end

  def render_submit(title = nil, click = 'this.parentNode.parentNode.querySelector(\'form\').submit()')
    name = action_name === 'edit' ? 'Update' : 'Create'
    title = title || "#{name} #{controller_name.singularize.humanize}"
    button_tag title, class: 'btn btn-warning',
        onclick: click,
        data: {disable_with: "Please wait..."}
  end

  def cancel_button(**args)
    name = args[:name] || t('cancel')
    redirect_url = args[:redirect_url] || send("author_#{controller_name}_path")
    link_to name, redirect_url, title: t('cancel')
  end

  def render_notification(item)
    content_tag(:div, class: 'error_explanation') do
      concat content_tag(:h2, "#{pluralize(item.errors.count, 'error')}: prohibited this item from being saved:")
      concat content_tag(:ul, item.errors.full_messages.collect { |message| "<li>#{message}</ li>" }.join.html_safe)
    end if item.errors.any?
  end

  def render_form
    render partial: "/author/#{controller_name}/form",
        locals: {
            item: instance_variable_get("@author_#{controller_name.singularize}"),
            types: @author_site_types
        }
  end

  private

  def render_field(type, f, name, disabled, autofocus = false, css = '')
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

  def render_json(content, selector, compressed = true, load = true)
    content_tag(:div, class: 'json-view') do
      concat pretty_print(content, selector, compressed) if load
    end
  end

  def pretty_print(content, selector = '.json-view', compressed)
    javascript_pack_tag('parser', id: 'parser',
        'data-compressed': compressed,
        'data-content': content,
        'data-selector': selector)
  end

  def json_pre(json)
    "<pre><code>#{JSON.pretty_generate(JSON.parse(json))}</code></pre>".html_safe
  end

  def bind_events(selectors = [], force = nil)
    pretty_print = selectors.map do |x|
      "param=tr.querySelector('li#{x}>div');
       $(prettyPrint(JSON.parse(param.innerText))).appendTo($(param).empty());"
    end
    javascript_tag [
        "var toggleTrace=new Event('click');",
        "var table=document.querySelector('##{controller_name}'),",
        "handlers=table.querySelectorAll('td.nw:first-child');",
        "handlers.forEach(function(handler){",
        "handler.addEventListener('click',function(){",
        "var plus=handler.querySelector('.fa-plus'),",
        "minus=handler.querySelector('.fa-minus'),",
        "tr=handler.parentNode.nextElementSibling;",
        "if(tr.classList.contains('hide')){",
        "tr.classList.remove('hide');",
        "if(plus)plus.classList.add('hide');",
        "if(minus)minus.classList.remove('hide');",
        'var param;',
        pretty_print.join,
        '}else{',
        "tr.classList.add('hide');",
        "if(plus)plus.classList.remove('hide');",
        "if(minus)minus.classList.add('hide')",
        '}});});',
        "#{'handlers[0].dispatchEvent(toggleTrace)' unless force.nil? }"
    ].join
  end

  def published(item)
    item.get_published_version.version rescue '?'
  end

  def activated(item)
    item.get_activated_version.version rescue '?'
  end

  def author_variable_get(title)
    instance_variable_get("@author_#{controller_name.singularize}").send(title) ||
        (DateTime.now).strftime('%Y %b %d %I:%M:%S %p')
  end

  private

  def site_type(mode)
    Author::SiteType.where(name: mode).first
  end

end
