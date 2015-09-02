namespace :setup do

  desc 'Init setup'
  task init: :environment do
    puts "\n>>> db:drop"
    Rake::Task['db:drop'].execute
    puts '>>> db:create'
    Rake::Task['db:create'].execute
    puts ">>> db:migrate\n\n"
    Rake::Task['db:migrate'].execute
    puts "\n>>> widget:load"
    Rake::Task['widget:load'].execute
    puts "\n>>> db:seed"
    Rake::Task['db:seed'].execute
    puts "\n>>> End setup"
  end

  task update: :environment do
    puts ">>> db:migrate\n\n"
    Rake::Task['db:migrate'].execute
    puts "\n>>> widget:load"
    Rake::Task['widget:load'].execute
    puts "\n>>> db:seed"
    Rake::Task['db:seed'].execute
    puts "\n>>> End setup"
  end
end