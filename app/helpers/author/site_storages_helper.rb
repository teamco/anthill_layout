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
             )
    end if versions.length > 0

  end

  def render_widgets
    content_tag(:div, class: 'field') do
      concat label_tag 'select_all_widgets',
                       "(Un)Select All widgets: #{@author_site_storage.author_widgets.size}",
                       {onclick: 'selectAll(this)'}
      concat hidden_field_tag('author_site_storage[author_site_storage_widget_ids][]', nil)
      concat get_categories
      concat javascript_tag "function selectAll(e){var $c=$(e).attr('for')===\"select_all_widgets\"?\"ul.widgets\":$(e).next(),$w=$('input[type=\"checkbox\"]',$c);$w.prop('checked',!$w.prop('checked'));updateCounter();}function updateCounter(){var $l=$('label[for=\"select_all_widgets\"]');$l.text($l.text().replace(/\\d+/,$('input[type=\"checkbox\"]:checked').length));}".html_safe
    end
  end

  private

  def get_categories
    content_tag(:ul, class: 'categories') do
      Author::WidgetCategory.order(:name_value).each { |category| concat get_category(category) }
    end
  end

  def get_category(category)
    content_tag(:li) do
      concat label_tag(dom_id(category), category.name_value, {onclick: 'selectAll(this)'})
      concat get_widgets(category)
    end
  end

  def get_widgets(category)
    content_tag(:ul, class: 'widgets') do
      category.author_widgets.order(:name).each { |widget| concat get_widget(widget, @author_site_storage.author_widget_ids) }
    end
  end

  def get_widget(widget, widget_ids)
    content_tag(:li, class: widget.is_external? ? 'external' : '') do
      concat check_box_tag 'author_site_storage[author_site_storage_widget_ids][]',
                           widget.id,
                           widget_ids.include?(widget.id), {
                               id: dom_id(widget),
                               onclick: 'updateCounter()'
                           }
      concat label_tag dom_id(widget), widget.name, {title: "#{widget.name}\n#{widget.description}"}
    end
  end
end