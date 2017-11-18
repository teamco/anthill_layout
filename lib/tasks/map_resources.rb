module MapResources

  PUBLIC_ASSETS = "#{Rails.root}/public/assets"

  class JsMap

    def initialize
      @map = {}
      create_map(:public_assets)
    end

    def create_map(ns)
      const_map = MapResources.const_get(ns.to_s.upcase)
      modules = Dir.glob("#{const_map}/**/*").select {|e| File.file? e}
      @map[ns] = {}
      modules.each do |c|
        name = c.gsub("#{const_map}/", '')
        is_a?(name)
        if File.file?(c) && @not_gz && (@js || @css || @img)
          key = name.sub(/-(?=[^-]*$)\w+/, '')
          @map[ns][key] = name
        end
      end
    end

    def map
      @map
    end

    private

    def is_a?(name)
      @not_gz = matcher(name, /.gz/) && (matcher(name, /.js.gz/) || matcher(name, /.css.gz/))
      @js = !matcher(name, /.js/)
      @css = !matcher(name, /.css/)
      @img = !matcher(name, /.png/)
    end

    def check_exist(path)
      exist_dir = File.exist?(path)
      puts ">>> Is exist: #{path}? #{exist_dir}"
      exist_dir
    end

    def write_file(path, content)
      File.open(path, 'w') {|file| file.puts content}
    end

    def matcher(str, regex)
      str.match(regex).nil?
    end

  end
end