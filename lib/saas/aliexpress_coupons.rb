require 'nokogiri'
require 'open-uri'

module AliExpress

  class Coupon
    def initialize(price, order_minimal_price, shop_address, shop_name, shop_image)
      @price = price.to_i
      @order_minimal_price = order_minimal_price.to_i
      @shop_address = shop_address.to_s
      @shop_name = shop_name.to_s
      @shops_image = shop_image.to_s
    end

    def valid?
      @price * 100 == @order_minimal_price - 1
    end
  end

  class CouponsParser
    def initialize(pages=5)
      @pages_limit = pages
      @page_number = 0
      @page = nil
      @html = []
      @prices = []
      @order_minimal_prices = []
      @shops_addresses = []
      @shops_names = []
      @shops_images = []
      @coupons = []
    end

    def get_coupons
      parse_pages
      coupons = parse_coupons
      coupons.map { |coupon| coupon if coupon.valid? }.compact
    end

    def parse_pages
      end_of_pages = false

      until end_of_pages
        @page_number += 1
        @page = Nokogiri::HTML(open("http://coupon.aliexpress.com/?page=#{@page_number}"))
        @html.push(@page.to_s)

        @page.search('.coupon-price').each do |price|
          price = price.content.scan(/\d+/).join('')
          @prices.push(price)
        end

        @page.search('.coupon-order-price').each do |price|
          price = price.content.scan(/\d+/).join('')
          @order_minimal_prices.push(price)
        end

        @page.search('.coupon-list').each do |coupons|
          @prices.each_with_index do |price, i|
            coupon = coupons.to_s.scan(/href="(.*)"/)[i]
            @shops_addresses.push(coupon)
          end
        end

        @page.search('.store-name').each do |name|
          name = name.content
          @shops_names.push(name)
        end

        @page.search('.store-img').each do |wrapper|
          wrapper.each_with_index do |img, i|
            src = wrapper.to_s.scan(/src="(.*)"/)[i]
            @shops_images.push(src)
          end
        end

        if @page_number == @pages_limit
          end_of_pages = true
          @html.join(' ')
        end
      end
    end

    def parse_coupons
      @prices.each_with_index do |price, i|
        @coupons.push(
            Coupon.new(
                price,
                @order_minimal_prices[i],
                @shops_addresses[i],
                @shops_names[i],
                @shops_images[i]
            )
        )
      end
      @coupons
    end
  end

end
# parser = CouponsParser.new(10)
# puts parser.get_coupons.inspect