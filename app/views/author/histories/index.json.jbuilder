json.array!(@author_histories) do |author_history|
  json.extract! author_history, :id, :site_id, :data
  json.url author_history_url(author_history, format: :json)
end
