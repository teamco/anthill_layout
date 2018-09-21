require 'fileutils'
require 'uuid'
require 'json'

module WidgetLib
  class InitContent

    def initialize
    end

    def init
      clean_db
      add_user
      add_categories
      set_routes
    end

    def set_routes
      @json_path = "#{Rails.root}/lib/tasks/widgets_list.json"
      @default_path = "#{Rails.root}/lib/tasks/widgets_init_list.rb"
    end

    def json_path
      @json_path
    end

    def default_path
      @default_path
    end

    def clean_db
      skip = ['ApplicationRecord']
      puts "\n>>> Start Clean models"
      Dir['app/models/**/*.rb'].each do |model|
        model = model.camelize.gsub(/App::Models::/, '').gsub(/\.rb/, '')
        model_object = model.constantize

        if model_object.methods.include? :delete_all
          puts "- Delete: #{model.inspect}"
          if skip.include? model
            puts "--> Skip Model: #{model_object.inspect}"
          else
            model_object.delete_all
          end
        end
      end
      puts '>>> Finish Clean models'
    end

    def add_user
      puts "\n>>> 1. Add user authentication"
      User.destroy_all
      puts '-- Clean: User'
      %w(registered banned moderator admin guest).each do |role|
        Role.find_or_create_by({name: role})
      end
      password = '1234567890'
      item = Author::Item.create(public: false, visible: true, user_id: 1)
      item.build_user(email: 'email@gmail.com', password: password,
          role_id: Role.find_by_name(:admin).id)
      item.save!
      puts "--- Admin: #{item.user.email}|#{password}"
      puts "--- Admin item: #{item.inspect}"
    end

    def add_categories
      categories = {
          regular: 'Regular widgets',
          text: 'Text editor',
          video: 'Video player',
          map: 'Map widgets',
          files: 'Show file',
          image: 'Image gallery',
          social: 'Social network',
          template: 'Template content',
          tv: 'Live TV',
          weather: 'Weather',
          xxx: 'Adult'
      }

      puts "\n>>> Start Add categories"

      categories.each_with_index do |c, index|
        item = Author::Item.new(public: true, visible: true, user_id: User.first.id)
        item.build_author_widget_category({name_index: c[0], name_value: c[1]})
        item.save!
        puts "#{index}: #{c[0]} >> #{c[1]}"
        puts "#{Author::WidgetCategory.last.inspect}"
      end

      puts '>>> Finish Add categories'
    end

    def load_initial_data
      require default_path
      @widgets = (WidgetsInitList.new).widgets
      # Clear file
      File.open(json_path, 'w') {|file| file.truncate(0)}
    end

    def load_json
      @widgets = JSON.parse(File.read(json_path)) rescue []
    end

    def add_data(store)
      puts "\n>>> Start Add widgets"

      uuid = UUID.new
      widget = WidgetLib::Generate.new

      JSON.parse(@widgets.to_json).each_with_index do |w, index|

        category = Author::WidgetCategory.find_by_name_index(w['type'])

        puts "#{index + 1}: #{w['name']} (#{category.name_value})" unless category.nil?
        puts "------#{w['name']}: #{w['type']}" if category.nil?

        hash = {
            name: w['name'],
            uuid: uuid.generate,
            description: w['description'],
            thumbnail: w['thumbnail'],
            width: w['dimensions']['width'],
            height: w['dimensions']['height'],
            widget_category_id: category.id,
            resource: w['resource'],
            is_external: w['is_external'],
            external_resource: w['external_resource']
        }

        item = Author::Item.new(public: true, visible: w['visible'].nil? ? true : w['visible'], user_id: 1)
        item.build_author_widget(hash)
        item.save!

        puts "Model item: #{item.author_widget.name}"
        puts "External: #{hash[:is_external]}" if hash[:is_external]
        puts "Resource: #{hash[:external_resource]}" if hash[:is_external]

        unless hash[:is_external]
          widget.init_params(w['resource'])
          widget.generate_css(w['thumbnail'])
        end

        widget.update_json(
            {
                name: w['name'],
                description: w['description'],
                thumbnail: w['thumbnail'],
                dimensions: {
                    width: w['dimensions']['width'],
                    height: w['dimensions']['height']
                },
                is_external: w['is_external'],
                external_resource: w['external_resource'],
                type: w['type'],
                resource: w['resource']
            }
        ) if store

      end

      combine_css
      puts ">>> Finish Add widgets: #{Author::Widget.all.size}"

    end

    def add_last_added

      set_routes
      load_json

      puts "\n>>> Start Add last widget to model"

      last = JSON.parse(@widgets.to_json).last
      uuid = UUID.new

      category = Author::WidgetCategory.find_by_name_index(last['type'])

      puts "#{last['name']} (#{category.name_value})" unless category.nil?

      hash = {
          name: last['name'],
          uuid: uuid.generate,
          description: last['description'],
          thumbnail: last['thumbnail'],
          width: last['dimensions']['width'],
          height: last['dimensions']['height'],
          widget_category_id: category.id,
          resource: last['resource'],
          is_external: last['is_external'],
          external_resource: last['external_resource']
      }

      item = Author::Item.new(public: true, visible: last['visible'].nil? ? true : last['visible'], user_id: 1)
      item.build_author_widget(hash)
      item.save!

      puts "Model item: #{item.author_widget.name}"
      puts ">>> Finish Add widget: #{Author::Widget.last.inspect}"

    end

    def combine_css(force = true)
      css_path = WidgetLib::Generate::CSS_PATH
      puts '--- Combine CSS'
      combined = "#{css_path}/combined.css"
      File.delete(combined) if File.exist? combined if force
      cli = RUBY_PLATFORM =~ /mswin|mingw|cygwin/ ? 'type' : 'cat'
      system("#{cli} #{css_path}/widgets/*.css #{force ? '>' : '>>'} #{combined}")
      puts '--- Delete uncombined CSS'
      FileUtils.rm_rf("#{css_path}/widgets")
    end

    def update_data
      puts "\n>>> Start update data"
      set_routes
      hash = []

      Author::Widget.all.each_with_index do |w, index|

        puts "#{index + 1}: #{w[:name]}"

        hash << {
            name: w[:name],
            description: w[:description],
            thumbnail: w[:thumbnail],
            dimensions: {
                width: w[:width],
                height: w[:height]
            },
            is_external: w[:is_external],
            external_resource: w[:external_resource],
            type: w.author_widget_category[:name_index],
            resource: w[:resource]
        }

      end

      File.open(json_path, 'a') do |f|
        f.truncate(0)
        f.write(hash.to_json)
      end

      puts '>>> End update data'
    end

    def destroy_data
      puts "\n>>> Start Destroy widget:"
      resource = STDIN.gets.chomp.strip
      widget = Author::Widget.find_by_resource(resource)
      if widget.nil?
        puts "Widget not in model: #{resource}"
      else
        puts "Delete from model: #{resource}"
        widget.destroy
      end
      widget_lib = WidgetLib::Generate.new
      widget_lib.file_name(resource)
      widget_lib.remove_widget_dir
      widget_lib.delete_css
      widget_lib.update_seed
      puts '>>> Finish Destroy widget'
    end

  end
end