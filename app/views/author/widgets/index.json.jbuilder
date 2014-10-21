json.array!(@author_widgets) do |author_widget|
  json.extract! author_widget, :id, :name, :description, :thumbnail, :width, :height, :type, :resource
  json.url author_widget_url(author_widget, format: :json)
end
