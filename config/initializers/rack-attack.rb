# Always allow requests from localhost
# (blacklist & throttles are skipped)
Rack::Attack.whitelist('Allow from localhost') do |req|
  # Requests are allowed if the return value is truthy
  '127.0.0.1' == req.ip
end

# Block requests from 10.17.240.7
Rack::Attack.blacklist('Block 10.17.240.7') do |req|
  # Requests are blocked if the return value is truthy
  '10.17.240.7' == req.ip
end