json.array!(@log) do |log|
  json.extract! log, :id, :exception
  json.url error_log_url(log, format: :json)
end