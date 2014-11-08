require "#{Rails.root}/lib/base/base.image.rb"

class BaseLib

  def self.img
    @img = BaseImage.new
  end

end