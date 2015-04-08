json.categories @json_data[:categories] do |category|
  json.extract! category, :id, :name_index, :name_value
  json.url author_widget_category_url(category)
end

json.widgets @json_data[:widgets] do |widget|
  json.extract! widget, :id, :uuid, :name, :description, :dimensions, :type, :resource
  json.url author_widget_url(widget[:id])
end