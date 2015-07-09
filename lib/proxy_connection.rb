require 'net/http'
require 'open-uri'

module Crawler
  class NetHttp
    def initialize
      init_proxy
    end

    def request_response(url, limit = 10)
      begin
        http = Net::HTTP::Proxy(@proxy_host, @proxy_port, @proxy_user, @proxy_pass)
        result = http.get_response(URI.parse(url))
        case result
          when Net::HTTPSuccess then
            result.body
          when Net::HTTPRedirection then
            request_response(result['location'], limit - 1)
          else
            result.error!
        end
      rescue Exception => e
        puts e.message
        return false
      end
    end

    private

    def get_proxy
      ENV['http_proxy']
    end

    def init_proxy
      @proxy = get_proxy
      unless @proxy.nil?
        uri = URI.parse(@proxy)
        @proxy_user, @proxy_pass = uri.userinfo.split(/:/) if uri.userinfo
        @proxy_host = uri.host
        @proxy_port = uri.port
      end
    end
  end
end