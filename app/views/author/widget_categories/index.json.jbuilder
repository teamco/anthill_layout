json.array!(@author_widget_categories) do |author_widget_category|
  json.extract! author_widget_category, :id, :name
  json.url author_widget_category_url(author_widget_category, format: :json)
end
