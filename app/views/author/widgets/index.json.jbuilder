json.array!(@json_widgets) do |author_widget|
  json.extract! author_widget, :id, :name, :description, :thumbnail, :dimensions, :type, :resource
  json.url author_widget_url(@author_widgets.find(author_widget[:id]), format: :json)
end
