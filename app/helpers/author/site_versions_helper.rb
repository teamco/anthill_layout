module Author::SiteVersionsHelper

  def version_th
    th(%w(Version Type Site Owner Date))
  end

  def version_td(collection)
    collection.first.map { |site_version| [
        "<tr#{site_version.activated ? ' class="success"' : ''}>",
        "<td class=\"separate\">#{site_menu(site_version)}#{site_version.version}</td>",
        version_type(site_version),
        "<td>#{link_to site_version.author_site_storage.key, edit_author_site_storage_path(site_version.author_site_storage)}</td>",
        "<td>#{site_version.author_item.user.original_email}</td>",
        "<td>#{site_version.author_item.created_at.strftime('%Y %b %d %I:%M:%S %p')}</td>",
        '</tr>'
    ] unless site_version.nil? }.join.html_safe
  end

  def version_type(version)
    text = 'Draft'
    text = 'Published' if version.published
    text = 'Activated' if version.activated
    text = 'Latest' if version == @partial[:latest]
    "<td>#{text}</td>"
  end

  def site_menu(site_version)
    render 'author/site_versions/site_menu', item: site_version
  end

  def activation_link(item)
    send("author_site_version_site_storage_#{item.activated? ? 'de' : ''}activate_path", item, item.author_site_storage)
  end

  def activation_name(item)
    t("site_version_#{item.activated? ? 'de' : ''}activate")
  end

  def activation_icon(item)
    "glyphicon-thumbs-#{item.activated? ? 'down' : 'up'}"
  end

  def get_version_style(item, latest)
    style = 'default'
    style = 'warning' if latest == item
    style = 'success' if item.published
    style = 'info' if item.activated
    style
  end

end