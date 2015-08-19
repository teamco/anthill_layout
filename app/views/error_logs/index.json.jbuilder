json.array!(@error_logs) do |error_log|
  json.extract! error_log, :id
  json.url error_log_url(error_log, format: :json)
end
