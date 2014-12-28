module Author::AuthorHelper

  def link_to_destroy(item, name)
    link_to 'Destroy', item, method: :delete, data: {confirm: "Are you sure want to delete: #{name}?"}
  end

  def render_title
    content_tag(:div, class: 'title') do
      if action_name === 'index'
        concat content_tag(:h1, "#{controller_name.humanize}: #{action_name} (#{@resource[:items]})")
        concat link_to("Add #{controller_name.humanize.singularize}", @resource[:path])
      end
      concat content_tag(:p, notice, id: 'notice')
    end
  end

  def render_text_field(f, name)
    render_field(:text_field, f, name)
  end

  def render_text_area(f, name)
    render_field(:text_area, f, name)
  end

  def render_number_field(f, name)
    render_field(:number_field, f, name)
  end

  def render_submit(f)
    content_tag(:div, class: 'actions') do
      f.submit
    end
  end

  def render_notification(item)
    content_tag(:div, id: 'error_explanation') do
      concat content_tag(:h2, "#{pluralize(item.errors.count, 'error')}: prohibited this item from being saved:")
      concat content_tag(:ul) do
        item.errors.full_messages.each do |message|
          concat content_tag(:li, message)
        end
      end
    end if item.errors.any?
  end

  def render_form
    content_tag(:div) do
      concat content_tag(:h1, "#{action_name.humanize} #{controller_name.humanize}")
      concat render 'form'
      concat link_to 'Back', {controller: controller_name}
    end
  end

  private

  def render_field(type, f, name)
    content_tag(:div, class: 'field') do
      concat f.label name
      concat f.send(type, name, {placeholder: "Enter #{name}"})
    end
  end

end
