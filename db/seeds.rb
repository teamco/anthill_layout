require 'uuid'

if Author::Widget.all.length > 0
  puts "\n>>> 1. Start types"
  Author::SiteType.destroy_all
  puts '-- Clean: Author::SiteType'
  types = %w(authorize consumption development test)
  types.each do |x|
    Author::SiteType.create({name: x})
    puts "-- Create: #{Author::SiteType.all.last.name}"
  end
  puts ">>> End types: #{Author::SiteType.all.length}"

  puts '>>> 2. Start storage'
  Author::SiteStorage.destroy_all
  puts '-- Clean: Author::SiteStorage'
  site = Author::SiteStorage.new({
                                     uuid: (UUID.new).generate,
                                     key: 'shared',
                                     site_type_id: Author::SiteType.first.id
                                 })

  site.author_site_versions.build({version: 1, activated: true})
  site.save!
  puts "-- Create: #{Author::SiteStorage.all.last.key}"
  puts '>>> End storage'

  puts "\n>>> Add user authentication"
  admin = User.create({
                          email: 'teamco@gmail.com',
                          password: '09051972',
                          admin: true
                      })
  puts "--- Admin: #{admin.email}"

  uuid = UUID.new

  site_type = Author::SiteType.where({name: 'development'}).first
  site_storage = Author::SiteStorage.new({
                                                key: 'shared',
                                                uuid: uuid.generate,
                                                user_id: admin.id,
                                                site_type_id: site_type.id
                                            })
  site_storage.author_site_versions.build({
                                              version: 1,
                                              activated: true,
                                              user_id: admin.id
                                          })

  site_storage.save

  puts "--- Type: #{site_type.name}"
  puts "--- Storage: #{site_storage.key} -> #{site_storage.author_site_type.name}"
  puts "--- Version: #{site_storage.author_site_versions.first.version}"

  Author::SiteType.all.each { |x| x.update({user_id: admin.id}) }
  puts '--- Update user in SiteType'
  Author::Widget.all.each { |x| x.update({user_id: admin.id}) }
  puts '--- Update user in Widget'
  Author::WidgetCategory.all.each { |x| x.update({user_id: admin.id}) }
  puts '--- Update user in WidgetCategory'
  puts '>>> End update user in models'

else
  puts '>>> Run: rake widget:load before seed'
end