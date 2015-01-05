require 'uuid'

if Author::Widget.all.length > 0
  puts '>>> 1. Start types'
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
else
  puts '>>> Run: rake widget:load before seed'
  Rake::Task['widget:load'].invoke
end