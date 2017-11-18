# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )

WIDGET_ASSETS = Rails.root.join('app', 'assets', 'scripts', 'plugins', 'widgets', '**')
PUBLIC_ASSETS = Rails.root.join('app', 'assets', 'public', '**')
JS_ASSETS = Rails.root.join('app', 'assets', 'scripts', '**')
IMAGES_ASSETS = Rails.root.join('app', 'assets', '**')
CSS_ASSETS = Rails.root.join('app', 'assets', '**')

def asset_iterator(assets, except = nil)
  Dir.glob(assets).each {|path| Rails.application.config.assets.paths << path unless path =~ except}
end

Rails.application.config.assets.precompile += %w( scripts/core/lib/require.js )
Rails.application.config.assets.precompile += %w( general.config.js )
Rails.application.config.assets.precompile += %w( scripts/core/lib/lz-string.js )
Rails.application.config.assets.precompile += %w( scripts/core/lib/packages/pretty.print.js )
Rails.application.config.assets.precompile += %w( author.js )
Rails.application.config.assets.precompile += ['public/*']
Rails.application.config.assets.precompile += ['public/*/css/*.css']
Rails.application.config.assets.precompile += ['public/*/javascripts/*']
Rails.application.config.assets.precompile += ['scripts/*']
Rails.application.config.assets.precompile += ['services/*']
Rails.application.config.assets.precompile += ['scripts/plugins/widgets/**']
Rails.application.config.assets.precompile += %w( scripts/plugins/**/*.css )
Rails.application.config.assets.precompile += %w( general.css )

asset_iterator(WIDGET_ASSETS)
asset_iterator(PUBLIC_ASSETS, 'grunt')
asset_iterator(JS_ASSETS)
asset_iterator(CSS_ASSETS)
