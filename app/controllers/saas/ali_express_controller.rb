require 'openssl'
require "#{Rails.root}/lib/saas/aliexpress_coupons.rb"

# http://gw.api.alibaba.com/dev/tools/api_test_intl.html?ns=aliexpress.open&n=api.getOnlineLogisticsInfo&v=1
# http://gw.api.alibaba.com/dev/tools/app_signature.html
# https://github.com/pinglamb/omniauth-aliexpress/blob/b0fb9e8e71f4c9998da6437730060285cf1c191f/lib/omniauth/aliexpress/strategies/aliexpress.rb
# http://www.17track.net/en/track?nums=02468485161&fc=0

class Saas::AliExpressController < ApplicationController

  include AliExpress

  def api_tool(api='api.findOrderById')
    @_aop_timestamp = Time.now.to_i
    redirect_to get_auth_uri(api, {orderId: 70481540629236})
  end

  def get_auth_uri(api, query_params={},
                   app_key=ENV['ALIEXPRESS_KEY'],
                   app_secret=ENV['ALIEXPRESS_SECRET'],
                   redirect_uri='http://localhost:3000',
                   site='aliexpress')
    [
        'http://gw.api.alibaba.com/openapi/param2/1/aliexpress.open/',
        api,
        "/#{app_key}?",
        query_params.collect { |k, v| "#{k}=#{v}&" },
        "access_token=#{User.current.oauth_token}",
        # "&_aop_timestamp=#{@_aop_timestamp}",
        "&_aop_signature=#{_aop_signature(
            app_secret, {
                          client_id: app_key,
                          redirect_uri: redirect_uri,
                          site: site,
                          state: ''#SecureRandom.hex(24)
                      })}"
    ].join
  end

  def get_coupon(pages_limit=5)
    parser = CouponsParser.new(pages_limit)
    parser.get_coupons
  end

  private

  def _aop_signature(app_secret, *args)
    digest  = OpenSSL::Digest::Digest.new('sha1')
    OpenSSL::HMAC.hexdigest(digest, app_secret.to_s, args.sort.flatten.join.to_s).upcase
  end
end
