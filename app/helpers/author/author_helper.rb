module Author::AuthorHelper

  def link_to_destroy(item, name)
    link_to 'Destroy', item, method: :delete, data: {confirm: "Are you sure want to delete: #{name}?"}
  end

  def render_title
    content_tag(:div, class: 'title') do
      concat content_tag(:h1, "#{controller_name.humanize}: #{action_name} (#{@resource[:items]})")
      concat link_to("Add #{controller_name.humanize.singularize}", @resource[:path]) if action_name === 'index'
      concat content_tag(:p, notice, id: 'notice')
    end
  end
end
