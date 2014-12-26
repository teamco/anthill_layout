module Author::AuthorHelper

  def link_to_destroy(item, name)
    link_to 'Destroy', item, method: :delete, data: {confirm: "Are you sure want to delete: #{name}?"}
  end

  def items_list
    [
        '<h1>', controller_name.humanize, '(', @resource[:items], ')</h1>',
        link_to("Add #{controller_name.humanize.singularize}", @resource[:path])
    ].join unless controller_name != 'new'
  end

end
