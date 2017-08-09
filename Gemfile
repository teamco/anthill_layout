source 'https://rubygems.org'
# ruby '~> 2.4.0'

windows_os = RUBY_PLATFORM =~ /mswin|mingw|cygwin/
teamco = ENV['PATH'] =~ /teamco/

# case RUBY_PLATFORM
#   when /darwin|linux/
gem 'rails', '>= 5.0.0'

gem 'bullet'
gem 'embedly'
gem 'iframely'
gem 'informant-rails'
gem 'mechanize'
gem 'mysql2' if teamco
gem 'pg', '>=0.20' unless teamco
gem 'pismo'
gem 'puma'
gem 'rake'
# gem 'rollbar'
gem 'sys-proctable' if windows_os
gem 'will_paginate'

group :test, :development do
  gem 'annotate', require: false
  gem 'brakeman', require: false
  gem 'byebug', require: false
  gem 'capistrano-rails', require: false
  gem 'debase', '>=0.2.2.beta7', require: false
  gem 'guard', require: false
  gem 'guard-livereload', '~> 2.5', require: false
  gem 'meta_request', require: false
  gem 'prmd', require: false
  gem 'pry-rails', require: false
  gem 'rails_best_practices', require: false
  gem 'request-log-analyzer', require: false
  gem 'rubocop', require: false
  gem 'rubocop-github', require: false
  gem 'ruby-debug-ide', '>=0.6.1.beta2', require: false
  gem 'rubycritic', require: false unless windows_os
  gem 'spring', require: false
  gem 'traceroute', require: false
  gem 'wirble', require: false
  gem 'xilence', require: false
end

gem 'derailed', group: :development
gem 'stackprof', group: :development unless windows_os

group :console do
  gem 'awesome_print', require: 'ap'
  gem 'hirb'
  gem 'interactive_editor'
  gem 'rails-console-tweaks'
  gem 'web-console'
end

group :doc do
  gem 'jsduck', require: false
  gem 'sdoc', '>= 0.4.0'
end

group :production do
  gem 'rails_12factor'
end

gem 'rack-attack'

# Use jquery as the JavaScript library
gem 'jquery-rails'
gem 'rmagick'

gem 'bootstrap-sass', '~> 3.3.6'
gem 'coffee-rails'
gem 'data_uri'
gem 'font-awesome-sass'
gem 'github_api'
gem 'sass-rails', '>= 3.2'

gem 'i18n'
gem 'tzinfo'
gem 'tzinfo-data'
gem 'uuid'

gem 'uglifier'

gem 'data-confirm-modal'
gem 'jbuilder'
gem 'therubyracer' unless windows_os

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
gem 'sprockets'
# gem 'cancan'

gem 'puma_worker_killer'