module Author::AuthorHelper

  def link_to_destroy(item, name)
    link_to 'Destroy', item, method: :delete, data: {confirm: "Are you sure want to delete: #{name}?"}
  end

  def render_add_new
    cname = controller_name.singularize
    link_to(
        '+',
        send("new_#{is_author? ? "author_#{cname}" : cname}_path"),
        {title: "Add #{controller_name.humanize.singularize}", class: 'add'}
    ) unless add_new_black_list.include? controller_name if action_name === 'index'
  end

  def render_title
    content_tag(:div, class: 'title') do
    end unless controller_name == 'author'
  end

  def render_text_field(f, name, disabled=false)
    render_field(:text_field, f, name, disabled)
  end

  def render_text(name, value)
    content_tag(:div, class: 'field') do
      concat label_tag name
      concat text_field_tag(name, value, {disabled: true})
    end
  end

  def render_text_area(f, name, disabled=false)
    render_field(:text_area, f, name, disabled)
  end

  def render_text_area_tag(name, value, disabled=false)
    content_tag(:div, class: 'field') do
      concat label_tag name
      concat text_area_tag(name, value, {disabled: disabled})
    end
  end

  def render_checkbox(f, name, disabled=false)
    content_tag(:div, class: 'field') do
      concat f.check_box(name, {disabled: disabled})
      concat f.label name
    end
  end

  def render_radio_button(f, name, value, checked=false, disabled=false)
    content_tag(:div, class: 'field') do
      concat f.radio_button(name, value, {disabled: disabled, checked: checked})
      concat f.label name
    end
  end

  def render_number_field(f, name, disabled=false)
    render_field(:number_field, f, name, disabled)
  end

  def render_collection(f, name, opts)
    content_tag(:div, class: 'field') do
      concat f.label name
      concat f.collection_select(opts[:id], opts[:collection], opts[:index], opts[:value])
    end unless opts[:collection].nil?
  end

  def render_submit(f)
    content_tag(:div, class: 'actions') do
      f.submit
    end
  end

  def render_notification(item)
    content_tag(:div, class: 'error_explanation') do
      concat content_tag(:h2, "#{pluralize(item.errors.count, 'error')}: prohibited this item from being saved:")
      concat content_tag(:ul, item.errors.full_messages.collect { |message| "<li>#{message}</li>" }.join.html_safe)
    end if item.errors.any?
  end

  def render_form
    content_tag(:div) do
      concat link_to '&#10157;'.html_safe, {controller: controller_name}, class: 'back'
      concat content_tag(:h1, "#{action_name.humanize} #{controller_name.humanize}")
      concat render partial: "/author/#{controller_name}/form",
                    locals: {
                        item: instance_variable_get("@author_#{controller_name.singularize}"),
                        types: @author_site_types
                    }
    end
  end

  private

  def render_field(type, f, name, disabled)
    content_tag(:div, class: 'field') do
      concat f.label name
      concat f.send(type, name, {disabled: disabled, placeholder: "Enter #{name.to_s.humanize}"})
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

  def pretty_print(content, selector='.json-view', compressed)
    javascript_tag compressed ?
                       "$(prettyPrint(JSON.parse(LZString.decompressFromBase64('#{content}')))).appendTo('#{selector}');".html_safe :
                       "$(prettyPrint(JSON.parse('#{content}'))).appendTo('#{selector}');".html_safe
  end

  def json_pre(json)
    "<pre><code>#{JSON.pretty_generate(JSON.parse(json))}</code></pre>".html_safe
  end

  def bind_events(selectors=[], force=nil)
    pretty_print = selectors.map { |x| "$param=$tr.find('li#{x}>div');$(prettyPrint(JSON.parse($param.text()))).appendTo($param.empty());" }
    javascript_tag [
                       "var $table=$('##{controller_name}');",
                       "$table.find('td>span').on('click.toggleTr',function(){",
                       "var $span=$(this),$tr=$span.parents('tr:first').next();",
                       "if($tr.hasClass('hide')){",
                       "$tr.removeClass('hide');",
                       "$span.text('-');",
                       'var $param;',
                       pretty_print.join,
                       '}else{',
                       "$tr.addClass('hide');",
                       "$span.text('+');",
                       '}});',
                       "#{'$table.find(\'td>span\').trigger(\'click.toggleTr\')' unless force.nil? }"
                   ].join
  end

end
