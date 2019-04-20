source 'https://rubygems.org'
ruby '2.6.0'

db = (RUBY_PLATFORM =~ /darwin/).nil? ? 'mysql2' : 'pg'
db = (ENV['PATH'] =~ /teamco/).nil? ? 'pg' : db

gem 'rails', '>= 5.0.0'

gem 'json'
gem 'bullet'
gem 'embedly'
gem 'iframely'
gem 'informant-rails'
gem 'mechanize'
gem db
gem 'pismo'
gem 'puma'
gem 'rake'
gem 'will_paginate'
gem 'geocoder'

group :test, :development do
  gem 'annotate', require: false
  gem 'brakeman', require: false
  gem 'byebug', require: false
  gem 'capistrano-rails', require: false
  gem 'debase', require: false
  gem 'guard', require: false
  gem 'guard-livereload', require: false
  gem 'meta_request', require: false
  gem 'prmd', require: false
  gem 'pry-rails', require: false
  gem 'rails_best_practices', require: false
  gem 'request-log-analyzer', require: false
  gem 'rubocop', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-github', require: false
  gem 'ruby-debug-ide', require: false
  gem 'rubycritic', require: false
  gem 'spring', require: false
  gem 'traceroute', require: false
  gem 'wirble', require: false
  gem 'xilence', require: false
end

gem 'derailed', group: :development
gem 'stackprof', group: :development

group :console do
  gem 'awesome_print', require: 'ap'
  gem 'hirb'
  gem 'interactive_editor'
  gem 'rails-console-tweaks'
  gem 'web-console'
end

group :doc do
  gem 'jsduck', require: false
  gem 'sdoc', require: false
end

group :production do
  gem 'rails_12factor'
end

gem 'rack-attack'

# gem 'rmagick'
gem 'chunky_png'

gem 'coffee-rails'
gem 'data_uri'
gem 'github_api'
gem 'sassc'

gem 'i18n'
gem 'tzinfo'
gem 'tzinfo-data'
gem 'uuid'

gem 'uglifier'

gem 'data-confirm-modal'
gem 'jbuilder'
gem 'therubyracer'

gem 'gravtastic'

gem 'devise'
gem 'devise_lastseenable'
gem 'omniauth'
# gem 'omniauth-digitalocean'
gem 'omniauth-aliexpress', git: 'https://github.com/pinglamb/omniauth-aliexpress'
gem 'omniauth-bitbucket'
gem 'omniauth-facebook'
gem 'omniauth-github'
gem 'omniauth-linkedin-oauth2'
gem 'omniauth-twitter'
# gem 'omniauth-amazon'
# gem 'omniauth-weibo-oauth2'
# gem 'omniauth-instagram'
# gem 'omniauth-google'

gem 'koala'
# gem 'sprockets'
gem 'foreman'
# gem 'cancan'

gem 'puma_worker_killer'
# gem 'unicorn'
gem 'rack-handlers'

gem 'webpacker', '>=4.0.0.rc.7'
