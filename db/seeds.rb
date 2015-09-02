require 'uuid'

if Author::Widget.all.length > 0
  puts "\n>>> 1. Start types"
  Author::SiteType.destroy_all
  puts '-- Clean: SiteType'
  types = %w(authorize consumption development test)
  types.each do |x|
    Author::SiteType.create({name: x})
    puts "-- Create: #{Author::SiteType.all.last.name}"
  end
  puts ">>> End types: #{Author::SiteType.all.length}"

  puts "\n>>> 2. Add user authentication"
  User.destroy_all
  puts '-- Clean: User'
  %w(registered banned moderator admin guest).each do |role|
    Role.find_or_create_by({name: role})
  end
  password = '1234567890'
  admin = User.create(
      email: 'email@gmail.com',
      password: password,
      role_id: Role.find_by_name(:admin).id
  )
  puts "--- Admin: #{admin.email}|#{password}"
  Author::SiteType.all.each { |x| x.update({user_id: admin.id}) }
  puts '--- Update user in SiteType'
  Author::Widget.all.each { |x| x.update({user_id: admin.id}) }
  puts '--- Update user in Widget'
  Author::WidgetCategory.all.each { |x| x.update({user_id: admin.id}) }
  puts '--- Update user in WidgetCategory'
  puts '>>> End update user in models'
  puts "\n>>> 3. Start storage"
  Author::SiteStorage.destroy_all
  puts '-- Clean: SiteStorage'
  template = 'N4IgxgTgpghgLlAJgQTiAXARgCwGYBsADAJwCsZxA7AEyEA0IArgA6LxKoY4En7W7YAHEIZwA9gGsoAOwwgYifIMHUVAWmxRiYDQOprBpGFDXVKAMzZhq+GJUKkQAXyA'
  
  site = admin.author_site_storages.build(
      uuid: (UUID.new).generate,
      key: 'shared',
      creator_id: admin.id,
      public: false,
      site_type_id: Author::SiteType.where({name: 'development'}).first.id
  )

  puts "\n--- Site: #{site.inspect}"

  site.author_site_versions.build(
      content: template,
      version: 1,
      activated: true,
      public: false,
      user_id: admin.id
  )

  site.save!

  puts "-- Storage: #{site.key} -> #{site.author_site_type.name}"
  puts "-- Version: #{site.author_site_versions.first.version}"
  puts '>>> End storage'

else
  puts '>>> Run: rake widget:load before seed'
end
