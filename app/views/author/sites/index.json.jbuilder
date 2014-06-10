json.array!(@author_sites) do |author_site|
  json.extract! author_site, :id, :name, :data
  json.url author_site_url(author_site, format: :json)
end
