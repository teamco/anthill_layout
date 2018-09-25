namespace :setup do

  desc 'Init setup'
  task init: :environment do
    system('git submodule update --init --recursive')
    Rake::Task['setup:clean'].execute
    Rake::Task['setup:migrate'].execute
  end

  desc 'Clean DB'
  task clean: :environment do
    puts "\n>>> db:drop"
    Rake::Task['db:drop'].execute
    puts '>>> db:create'
    Rake::Task['db:create'].execute
  end

  desc 'Migrate DB'
  task migrate: :environment do
    puts ">>> db:migrate\n\n"
    Rake::Task['db:migrate'].execute
  end


  desc 'Load default content'
  task load: :environment do
    puts "\n>>> widget:load"
    Rake::Task['widget:load'].execute
    puts "\n>>> db:seed"
    Rake::Task['db:seed'].execute
  end

  desc 'Add site storage admin users'
  task storage_users: :environment do
    sites = Author::SiteStorage.all
    admin = User.first
    sites.each do |s|
      s.users.clear
      s.users << admin
      s.save!
      puts ">>> Site users: #{s.users}"
    end
  end

  desc 'Map static resources'
  task map: :environment do
    Rake::Task['map:resources'].execute
  end

end