require 'fileutils'
require 'data_uri'
require "#{Rails.root}/lib/base/base_image.rb"

module WidgetLib

  class Generate

    include Magick

    def initialize
      @img = BaseImage.new
    end

    def init_params(cname)
      puts "Enter widget name separated by dots or underscore: #{cname}"
      raise ScriptError.new("Wrong widget name: #{cname}") if cname.match(/\d/)
      @cname = cname || STDIN.gets.chomp.strip
      raise ScriptError.new("Wrong class name: #{@cname}") if cname.empty?
      @class_name = camel_case ''
      @thumbnail = ''
      set_file_name((camel_case '.').downcase)
    end

    def set_clone(clone)
      puts 'Enter clone widget resource (default "empty"):'
      clone ||= STDIN.gets.chomp.strip
      @clone = clone.empty? ? 'empty' : clone
    end

    def do_create
      init_params(nil)
      set_clone(nil)

      puts ">>> Expected class name: #{@class_name}"
      puts ">>> Expected directory name: #{@file_name}"
      puts ">>> Expected thumbnail path: #{@thumbnail}"
      puts ">>> Clone from: #{@clone}"

      puts 'To continue press [y/n]:'
      confirm = STDIN.gets.chomp.strip

      do_it if confirm == 'y'
    end

    def get_cname
      @cname
    end

    def get_class_name
      @class_name
    end

    def get_file_name
      @file_name
    end

    def set_file_name(name)
      @file_name = name
    end

    def remove_widget_dir
      FileUtils.rm_rf "#{widgets_path}#{@file_name}" if check_exist
    end

    def do_it
      path = widgets_path

      unless check_exist

        src_pattern = @clone
        puts ">>> Start copy [#{path}#{src_pattern}] to [#{path}#{@file_name}]"

        FileUtils.cp_r(
            "#{path}#{src_pattern}",
            "#{path}#{@file_name}"
        )

        puts '>>> Finish copy'

        files_list = Dir.glob("#{path}#{@file_name}/**/*").select { |e| File.file? e }

        files_list.each do |f|
          puts ">>> Rename: #{f}"
          @path = f.gsub(src_pattern, @file_name)
          File.rename f, @path
          puts "... Adopt Class name to: #{@class_name}"
          write_file src_pattern.capitalize, @class_name
          puts "... Adopt View element name to: $#{@class_name.downcase}"
          write_file "$#{src_pattern}", "$#{@class_name.downcase}"
          puts "... Adopt require.js path to: #{@file_name}"
          write_file "#{src_pattern}.", "#{@file_name}."
          write_file "/#{src_pattern}/", "/#{@file_name}/"
          puts "... Adopt CSS to: .#{@class_name.downcase}"
          write_file ".#{src_pattern}", ".#{@file_name.split('.').join('-')}"
          write_file "'#{src_pattern}',", "'#{@file_name}',"
          puts "... Adopt Model name to: #{@class_name}"
          write_file src_pattern, @class_name.downcase
        end

        generate_css(@thumbnail)
      end

    end

    def update_json(hash)
      path = "#{Rails.root}/lib/tasks/widgets_list.json"
      widgets_list = JSON.parse(File.read(path)) rescue []
      puts "--- Store: #{hash[:name]}"
      widgets_list << hash
      File.open(path, 'a') do |f|
        f.truncate(0)
        f.write(widgets_list.to_json)
      end
    end

    def update_seed
      seed = false
      begin
        path = "#{Rails.root}/lib/tasks/widgets_list.json"
        hash = Author::Widget.includes(:author_widget_category).all.map do |w|
          {
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
        puts "--- Store: #{hash.size} widgets"
        File.open(path, 'a') do |f|
          f.truncate(0)
          f.write(hash.to_json)
        end
        seed = true
      rescue
        puts '>>>>> Unable to update seeds'
      end
      seed
    end

    def delete_css
      path = "#{css_path}/widgets/#{@file_name}.css"
      exist_file = File.exist?(path)

      if exist_file
        puts "--- Delete css: #{path}"
        File.delete(path)
      end
    end

    def delete_image
      path = "#{css_path}/images/#{@file_name}.png"
      exist_file = File.exist?(path)

      if exist_file
        puts "--- Delete image: #{path}"
        File.delete(path)
      end
    end

    def generate_css(thumbnail)

      if thumbnail.nil?
        puts '+++ Unable to get thumbnail'
        return false
      end

      Dir.mkdir "#{css_path}/widgets" unless File.exists? "#{css_path}/widgets"
      Dir.mkdir "#{css_path}/images" unless File.exists? "#{css_path}/images"

      path = "#{css_path}/widgets/#{@file_name}.css"
      delete_css
      puts "--- Create CSS file: #{@file_name}.css"

      File.open("#{path}", 'w') do |f|
        pattern = @file_name.gsub(/\./, '-')
        f.write(".widget.#{pattern}{background-image:url('/assets/scripts/plugins/stylesheets/images/#{@file_name}.png');}")
      end

      puts "--- Create image from Base64: #{@file_name}.png"
      begin
        image = ImageList.new
        resized = @img.resize(
            image.from_blob(
                Base64.decode64(
                    thumbnail['data:image/png;base64,'.length .. -1]
                )
            )
        )
        delete_image
        resized.write("#{css_path}/images/#{@file_name}.png")
      rescue
        puts '+++ Unable to convert image'
      end
    end

    def widgets_path
      './app/assets/javascripts/scripts/plugins/widgets/'
    end

    def css_path
      './app/assets/javascripts/scripts/plugins/stylesheets'
    end

    private

    def camel_case(separator)
      @cname.scan(/\w+/).join('_').gsub(/\d+/, '').split('_').map { |e| e.capitalize }.join(separator)
    end

    def check_exist
      path = widgets_path
      exist_dir = File.exist?("#{path}#{@file_name}")
      puts "Widget exist: #{path}#{@file_name}" if exist_dir
      exist_dir
    end

    def write_file(from, to)
      content = File.read(@path).gsub(from, to)
      File.open(@path, 'w') do |file|
        file.puts content
      end
    end

  end
end