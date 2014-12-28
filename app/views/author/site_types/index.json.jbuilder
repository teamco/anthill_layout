json.array!(@author_site_types) do |author_site_type|
  json.extract! author_site_type, :id, :name
  json.url author_site_type_url(author_site_type, format: :json)
end
