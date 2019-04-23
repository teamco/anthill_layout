require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Anthill
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # config.assets.initialize_on_precompile = false
    config.load_defaults 5.1

    config.autoload_paths << Rails.root.join('lib')
    config.action_view.field_error_proc = Proc.new { |html_tag, instance| html_tag }

    config.middleware.use Rack::Attack

    # Specify the file paths that should be browserified. We browserify everything that
    # matches (===) one of the paths. So you will most likely put lambdas
    # regexes in here.
    #
    # By default only files in /app and /node_modules are browserified,
    # vendor stuff is normally not made for browserification and may stop
    # working.
    # config.browserify_rails.paths << /vendor\/assets\/javascripts\/module\.js/

    # Environments in which to generate source maps
    #
    # The default is none
    # config.browserify_rails.source_map_environments << "development"

    # Should the node_modules directory be evaluated for changes on page load
    #
    # The default is `false`
    # config.browserify_rails.evaluate_node_modules = true

    # Force browserify on every found JavaScript asset if true.
    # Can be a proc.
    #
    # The default is `false`
    # config.browserify_rails.force = ->(file) { File.extname(file) == ".ts" }

    # Command line options used when running browserify
    #
    # can be provided as an array:
    # config.browserify_rails.commandline_options = ["-t babelify --presets [ es2015 stage-0 ]"]

    # or as a string:
    # config.browserify_rails.commandline_options = "-t browserify-shim --fast"

    # enabling incremental in production
    # config.browserify_rails.use_browserifyinc = true

    # Define NODE_ENV to be used with envify
    #
    # defaults to Rails.env
    # config.browserify_rails.node_env = "production"
  end
end
