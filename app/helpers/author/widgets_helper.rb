module Author::WidgetsHelper

  def fetch_external_thumbnail(item)
    " style=\"background-image:url('#{item.external_resource}images/#{item.resource}.png');\"".html_safe if item.is_external?
  end
end