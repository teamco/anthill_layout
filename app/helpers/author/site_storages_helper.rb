module Author::SiteStoragesHelper

  def render_activated_version(f)
    versions = @author_site_storage.author_site_versions
    activated = versions.where(activated: true).first
    activated_version = activated.nil? ? activated : activated.id
    content_tag(:div, class: 'field') do
      concat f.label :activated_version
      concat f.collection_select(
                 :activated_version,
                 versions,
                 :id,
                 :version,
                 {selected: activated_version}
             #,{disabled: 'disabled'}
             )
    end if versions.length > 0

  end
end
