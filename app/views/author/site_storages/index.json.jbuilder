json.array!(@author_site_storages) do |author_site_storage|
  json.extract! author_site_storage, :id
  json.url author_site_storage_url(author_site_storage, format: :json)
end
