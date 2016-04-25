json.array!([@author_site_version]) do |version|
  json.extract! version.author_site_storage, :key
  json.extract! version, :published
  json.extract! version.author_item, :updated_at
end
