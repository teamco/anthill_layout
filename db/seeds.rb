require 'uuid'

if Author::Widget.all.length > 0
  puts "\n>>> 1. Add user authentication"
  User.destroy_all
  puts '-- Clean: User'
  %w(registered banned moderator admin guest).each do |role|
    Role.find_or_create_by({name: role})
  end
  password = '1234567890'
  admin = User.create(email: 'email@gmail.com', password: password, role_id: Role.find_by_name(:admin).id)
  item = Author::Item.create(public: false, visible: true, user_id: admin.id)
  admin.update(item_id: item.id)
  puts "--- Admin: #{admin.email}|#{password}"
  puts "--- Admin item: #{admin.author_item.inspect}"

  puts "\n>>> 2. Start types"
  Author::SiteType.destroy_all
  puts '-- Clean: SiteType'
  types = %w(authorize consumption development test)
  types.each do |x|
    item = Author::Item.new(public: true, visible: true, user_id: admin.id)
    item.build_author_site_type(name: x)
    item.save
    puts "-- Create: #{item.author_site_type.name}"
  end

  puts "\n>>> 3. Update widget's user_id"
  Author::Widget.all.each do |x|
    x.author_item.update(user_id: admin.id)
    puts "-- Update user: #{x.name}"
  end

  puts "\n>>> 4. Update widget's category item"
  Author::WidgetCategory.all.each do |x|
    item = Author::Item.create(public: true, visible: true, user_id: admin.id)
    x.update(item_id: item.id)
    puts "-- Update user: #{item.author_widget_category.name_value}"
  end

  puts '>>> End update user in models'
  puts "\n>>> 5. Start storage"
  Author::SiteStorage.destroy_all
  puts '-- Clean: SiteStorage'
  template = 'N4IgxgTgpghgLlAJgQTiAXARgCwGYBsADAJwCsZxA7AEyEA0IArgA6LxKoY4En7W7YAHEIZwA9gGsoAOwwgYifIMHUVAWmxRiYDQOprBpGFDXVKAMzZhq+GJUKkQAXyA'

  item = Author::Item.new(public: false, visible: true, user_id: admin.id)
  site = item.build_author_site_storage(
      uuid: (UUID.new).generate,
      key: 'shared',
      site_type_id: Author::SiteType.find_by_name('development').id
  )
  item.save

  puts "\n--- Site: #{item.author_site_storage.inspect}"
  puts "\n--- Site item: #{item.inspect}"

  item = Author::Item.create(public: false, visible: true, user_id: admin.id)
  site.author_site_versions.build(
      content: template,
      version: 1,
      item_id: item.id,
      activated: true
  ).save

  puts "--- Storage: #{site.key} -> #{site.author_site_type.name}"
  puts "--- Version: #{site.author_site_versions.inspect}"
  puts '>>> End storage'

else
  puts '>>> Run: rake widget:load before seed'
end
