json.categories do
  json.array!(@json_data[:categories]) do |category|
    json.extract! category, :id, :name_index, :name_value
    json.url author_widget_category_url(@json_data[:categories].find(category[:id]), format: :json)
  end
end

json.widgets do
  json.array!(@json_data[:widgets]) do |widget|
    json.extract! widget, :id, :uuid, :name, :description, :thumbnail, :dimensions, :type, :resource
    json.url author_widget_url(@author_widgets.find(widget[:id]), format: :json)
  end
end
