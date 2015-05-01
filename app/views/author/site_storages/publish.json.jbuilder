json.array!([@author_site_storage]) do |author_site_storage|
  json.extract! author_site_storage, :key
  json.extract! author_site_storage, :publish
  json.extract! author_site_storage, :updated_at
end
