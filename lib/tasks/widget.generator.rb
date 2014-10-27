require 'fileutils'

class WidgetGenerate

  def initialize

    puts 'Enter widget name separated by dots or underscore:'
    @cname = STDIN.gets.chomp.strip

    @class_name = camel_case ''
    @file_name = (camel_case '.').downcase

    puts ">>> Expected class name: #{@class_name}"
    puts ">>> Expected directory name: #{@file_name}"

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

  def camel_case(separator)
    @cname.scan(/\w+/).join('_').gsub(/\d+/, '').split('_').map { |e| e.capitalize }.join(separator)
  end

  def write_file(from, to)
    content = File.read(@path).gsub(from, to)
    File.open(@path, 'w') do |file|
      file.puts content
    end
  end

  def do_it

    path = './app/assets/javascripts/scripts/plugins/widgets/'
    src_pattern = 'empty'

    puts ">>> Start copy [#{path}#{src_pattern}] to [#{path}#{@file_name}]"

    exist_dir = File.exist?("#{path}#{@file_name}")

    raise ArgumentError, "Already exist (skip): #{path}#{@file_name}" if exist_dir

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

    end

  end

end
