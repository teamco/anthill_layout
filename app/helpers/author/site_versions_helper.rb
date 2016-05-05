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
    ] }.join.html_safe
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

end