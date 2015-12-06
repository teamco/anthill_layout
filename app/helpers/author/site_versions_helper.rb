module Author::SiteVersionsHelper

  def version_th
    th(%w(Version Site Owner Date))
  end

  def version_td
    @partial[:collection].first.map { |site_version| [
        "<tr#{site_version.activated ? ' class="success"' : ''}><td>#{site_version.version}</td>",
        "<td>#{link_to site_version.author_site_storage.key, edit_author_site_storage_path(site_version.author_site_storage)}</td>",
        "<td>#{site_version.author_item.user.original_email}</td>",
        "<td>#{site_version.author_item.created_at.strftime('%Y %b %d %I:%M:%S %p')}</td><td>",
        site_menu(site_version),
        '</td></tr>'
    ] }.join.html_safe
  end

  def site_menu(site_version)
    render 'author/site_versions/site_menu', item: site_version
  end
end