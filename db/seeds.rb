require 'uuid'

if Author::Widget.all.length > 0
  puts "\n>>> 1. Add user authentication"
  User.destroy_all
  puts '-- Clean: User'
  %w(registered banned moderator admin guest).each {|role| Role.find_or_create_by({name: role})}
  password = '1234567890'
  admin = User.new(
      email: 'email@gmail.com',
      password: password,
      role_id: Role.find_by_name(:admin).id
  )
  admin.build_author_item(
      public: false,
      visible: true,
      user_id: admin.id
  )
  admin.save!
  puts "--- Admin: #{admin.inspect}"
  puts "--- Admin: #{admin.email}|#{password}"
  puts "--- Admin item: #{admin.author_item.inspect}"


  puts "\n>>> 2. Start types"
  Author::SiteType.destroy_all
  puts '-- Clean: SiteType'
  types = %w(authorize consumption development test)
  types.each do |x|
    type = Author::SiteType.new(name: x)
    type.build_author_item(public: true, visible: true, user_id: admin.id)
    type.save!
    puts "-- Create: #{type.name}"
  end

  puts "\n>>> 3. Update widget's user_id"
  Author::Widget.all.each do |x|
    x.author_item.update(user_id: admin.id)
    puts "-- Update user: #{x.name}"
  end

  puts "\n>>> 4. Update widget's category item"
  Author::WidgetCategory.all.each do |x|
    x.author_item.update(user_id: admin.id)
    puts "-- Update user: #{x.name_value}"
  end

  puts '>>> End update user in models'
  puts "\n>>> 5. Start storage"
  Author::SiteStorage.destroy_all
  puts '-- Clean: SiteStorage'
  template = 'N4IgxgTgpghgLlAJgQTiAXARgCwGYBsADAJwCsZxA7AEyEA0IArgA6LxKoY4En7W7YAHEIZwA9gGsoAOwwgYifIMHUVAWmxRiYDQOprBpGFDXVKAMzZhq+GJUKkQAXyA'

  site = Author::SiteStorage.new(
      uuid: (UUID.new).generate,
      key: 'shared',
      site_type_id: Author::SiteType.find_by_name('development').id
  )
  site.build_author_item(public: false, visible: true, user_id: admin.id)
  site.save!

  puts "\n--- Storage: #{site.key} -> #{site.author_site_type.name}"
  puts "--- Site: #{site.inspect}"
  puts "--- Site item: #{site.author_item.inspect}"

  version = site.author_site_versions.build(
      content: template,
      version: 1,
      activated: true
  )
  version.build_author_item(public: false, visible: true, user_id: admin.id)
  version.save!
  puts "--- Version: #{site.author_site_versions.inspect}"

  site.users << admin
  site.save!

  puts '>>> End storage'

else
  puts '>>> Run: rake widget:load before seed'
end
