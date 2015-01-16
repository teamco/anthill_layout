module Author::SiteStoragesHelper

  def render_activated_version(f)
    versions = @author_site_storage.author_site_versions
    content_tag(:div, class: 'field') do
      concat f.label :activated_version
      concat f.collection_select(
                 :id,
                 versions,
                 :id,
                 :version
             )
    end if versions.length > 0

  end
end
