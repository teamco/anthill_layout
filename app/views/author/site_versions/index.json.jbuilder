json.array!(@author_site_versions) do |author_site_version|
  json.extract! author_site_version, :id
  json.url author_site_version_url(author_site_version, format: :json)
end
