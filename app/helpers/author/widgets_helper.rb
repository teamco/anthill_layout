module Author::WidgetsHelper

  def fetch_external_thumbnail(item)
    " style=\"background-image:url('#{item.external_resource}images/#{item.resource}.png');\"".html_safe if item.is_external?
  end

  def redirect_on_cancel(item)
    item.author_widget_category.nil? ?
      author_widgets_path :
      author_widget_category_widgets_path(item.author_widget_category)
  end

  def create_in_category_url(category)
    category.nil? ?
      new_author_widgets_path :
      new_author_widget_category_widgets_path(category)
  end
end