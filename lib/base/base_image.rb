require 'base64'
require 'data_uri'
require 'rmagick'
require 'open-uri'
require 'net/http'

class BaseImage

  include Magick

  def allowed?(url)
    puts '>>>>> Check allowed size'
    uri = URI(url)

    Net::HTTP.start(uri.host, uri.port) do |http|
      response = http.request_head(URI.escape(uri.path))
      file_size = response['content-length'].to_i
      puts ">>>>> File size: #{file_size}, #{file_size > 164000}"
      raise '--- File too big' if file_size > 164000
    end

    tmp_file = open(url) { |io| io.read }
    image = ImageList.new
    image.from_blob(tmp_file)
  end

  def resize(image, width=64, height=64)

    puts ">>>>> Check if should be resized"
    return image if image.columns <= width && image.rows <= height

    puts '--- Will maintain aspect ratio, so one of the resized dimensions may be less than the specified dimensions'
    resized = image.resize_to_fit(width, height)
    puts '--- Without a default, background color will vary based on the border of your original image'
    resized.background_color = 'transparent'
    puts '--- Calculate necessary translation to center image on background'
    x = (resized.columns - width) / 2
    y = (resized.rows - height) / 2
    puts '--- Extent fills out the resized image if necessary, with the background color, to match the full requested dimensions. the x and y parameters calculated in the previous step center the image on the background'
    resized.extent(width, height, x, y)
  end

  def data_uri(img)
    puts '>>>>> Start Data-URI'
    allowed = resize(img)
    uri = "data:image/#{allowed.format.downcase};base64,#{Base64.strict_encode64(allowed.to_blob)}"
    puts ">>>>> End Data-URI:\n #{uri}"
    uri
  end

  def to_img_file(data_uri)
    uri = URI::Data.new(data_uri)
    f_name = Time.now.to_i
    File.write("#{Rails.root}/app/assets/images/#{f_name}", uri.data)
    f_name
  end

  def to_img(data_uri)
    uri = URI::Data.new(data_uri)
    image = ImageList.new
    image.from_blob(uri.data.to_blob)
    data_uri(image)
  end

end