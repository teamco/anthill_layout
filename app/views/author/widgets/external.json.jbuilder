json.widget do
  json.extract! @external, 'name', 'description', 'resource', 'type', 'width', 'height', 'thumbnail'
end