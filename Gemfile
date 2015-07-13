source 'https://rubygems.org'

# Use sqlite3 as the database for Active Record
# gem 'sqlite3'

gem 'mysql2'

# Use puma/thin/unicorn as the app server
case RUBY_PLATFORM
  when /darwin|linux/

    # Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
    gem 'rails', '>= 4.2.0'

    gem 'puma'
    gem 'embedly'

    # Use debugger
    gem 'byebug', group: [:development, :test]

    group :development do

      gem 'bullet'
      gem 'xilence'
      gem 'meta_request'

      gem 'pry-rails'
      gem 'web-console', '~> 2.0'
      gem 'prmd'
      gem 'ruby-debug-ide', '>= 0.4.25'

      # Use Capistrano for deployment
      gem 'capistrano-rails'
      gem 'debase', '>= 0.1.3.beta1'
    end

    group :console do
      gem 'rails-console-tweaks'
      gem 'awesome_print'
      gem 'hirb'
      gem 'interactive_editor'
    end

    gem 'rack-attack'

    # Use jquery as the JavaScript library
    gem 'jquery-rails', '>= 4.0.0'
    gem 'rmagick', '>= 2.13.4'

  when /win32/

  else

    gem 'rails', '>= 4.1.1'
    gem 'jquery-rails'
    gem 'thin'
end

gem 'i18n', '>= 0.7.0.beta1'
gem 'uuid'
gem 'tzinfo-data'
gem 'tzinfo'
gem 'data_uri'

# Use SCSS for stylesheets
gem 'sass-rails', '>= 4.0.3'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '>= 4.0.0'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
# gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '>= 2.0'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '>= 0.4.0', group: :doc

# Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
gem 'spring', group: :development
gem 'wirble', group: :development
gem 'jsduck', group: :development

gem 'therubyracer'
gem 'devise'
gem 'omniauth'
gem 'omniauth-digitalocean'
gem 'omniauth-twitter'
gem 'omniauth-amazon'
gem 'omniauth-facebook'
gem 'omniauth-google'
gem 'omniauth-github'
gem 'cancan'