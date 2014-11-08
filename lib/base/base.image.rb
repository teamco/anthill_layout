# encoding: US-ASCII
class BaseImage

  TYPES = %w(bmp gif png jpg)

  def initialize
    TYPES.each do |t|
      define_singleton_method "#{t}?(file)" do |file|
        image_type(file) == t
      end
      puts "#{t}?(file)"
    end
  end

  def image_type(file)
    case IO.read(file, 10)
      when /^BM/
        'bmp'
      when /^GIF8/
        'gif'
      when /^\x89PNG/
        'png'
      when /^\xff\xd8\xff\xe0\x00\x10JFIF/
        'jpg'
      when /^\xff\xd8\xff\xe1(.*){2}Exif/
        'jpg'
      else
        'unknown'
    end
  end

end