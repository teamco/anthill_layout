json.array!(@json_data) do |data|
  json.array!(@json_data[:categories]) do |category|
    json.extract! category, :id, :name_index, :name_value
    json.url author_widget_category_url(@json_data[:categories].find(category[:id]), format: :json)
  end
  json.array!(@json_data[:widgets]) do |widgets|
    json.extract! widgets, :id, :name, :description, :thumbnail, :dimensions, :type, :resource
    json.url author_widget_url(@author_widgets.find(widgets[:id]), format: :json)
  end
end
