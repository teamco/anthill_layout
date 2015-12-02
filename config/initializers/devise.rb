Devise.setup do |config|

  #Replace example.com with your own domain name
  config.mailer_sender = 'teamco@gmail.com'

  require 'devise/orm/active_record'
  config.case_insensitive_keys = [:email]
  config.strip_whitespace_keys = [:email]
  config.skip_session_storage = [:http_auth]
  config.stretches = Rails.env.test? ? 1 : 10
  config.reconfirmable = true
  config.expire_all_remember_me_on_sign_out = true
  config.password_length = 8..128
  config.reset_password_within = 6.hours
  config.sign_out_via = :delete
  config.scoped_views = true

  config.secret_key = 'd75ea36b070d78663a9f82f9170f78c0901b942788b46e0976f9d49b7405723e78af190abc4bb14cc1edada13cb60deb0d11898cb18dc8a55ccb10f76e01ad75'

  #Add your ID and secret here
  #ID first, secret second
  # config.omniauth :digitalocean, ENV['DIGITALOCEAN_KEY'], ENV['DIGITALOCEAN_SECRET']
  # config.omniauth :google, ENV['GOOGLE_KEY'], ENV['GOOGLE_SECRET']
  # config.omniauth :amazon, ENV['AMAZON_KEY'], ENV['AMAZON_SECRET']
  config.omniauth :github,
                  ENV['GITHUB_KEY'],
                  ENV['GITHUB_SECRET']

  config.omniauth :bitbucket,
                  ENV['BITBUCKET_KEY'],
                  ENV['BITBUCKET_SECRET']

  config.omniauth :aliexpress,
                  ENV['ALIEXPRESS_KEY'],
                  ENV['ALIEXPRESS_SECRET']

  config.omniauth :linkedin,
                  ENV['LINKEDIN_KEY'],
                  ENV['LINKEDIN_SECRET'],
                  scope: 'r_basicprofile r_emailaddress'

  config.omniauth :twitter,
                  ENV['TWITTER_KEY'],
                  ENV['TWITTER_SECRET'], {
                      secure_image_url: 'true',
                      image_size: 'original',
                      authorize_params: {
                          force_login: 'true',
                          lang: 'en'
                      }
                  }
  config.omniauth :facebook,
                  ENV['FACEBOOK_KEY'],
                  ENV['FACEBOOK_SECRET'], {
                      scope: 'email,public_profile',
                      info_fields: 'email,name'
                  }
end

# LINKEDIN_KEY='77ai0hkh1kbxtf'
# LINKEDIN_SECRET='dpFRQqaHXw3GamoT'
# FACEBOOK_KEY='1615337032066573'
# FACEBOOK_SECRET='c9d799104ab6cd8910e64b498e5c9ecf'
# TWITTER_KEY='yBuzhtfeDLAUJGsbNTrpQ9zMB'
# TWITTER_SECRET='RmhlL4T25WOA1NEnQ8nLWEaqXiiJoM3HgYanSYVwtuNCYcojRZ'
# ALIEXPRESS_KEY='38279'
# ALIEXPRESS_SECRET='SiNNPYVD3uv'
# GITHUB_KEY='ab92f6fb8ea978433623'
# GITHUB_SECRET='3ef3f5b9e9c8f62750dcaf212ef18ca373c09c4b'
# BITBUCKET_KEY='yUaYntrve4qrUxEwaS'
# BITBUCKET_SECRET='LQV2Cd24uJzK7wzmVn4x7cBZXgq2rDd2'
