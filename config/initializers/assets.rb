WIDGET_ASSETS = Rails.root.join('app', 'assets', 'scripts', 'plugins', 'widgets', '**')
PUBLIC_ASSETS = Rails.root.join('app', 'assets', 'public', '**')
JS_ASSETS = Rails.root.join('app', 'assets', 'scripts', '**')

def asset_iterator(assets, except = nil)
  Dir.glob(assets).each {|path| Rails.application.config.assets.paths << path unless path =~ except}
end

Rails.application.config.assets.precompile += %w( scripts/core/lib/require.js )
Rails.application.config.assets.precompile += %w( general.config.js )
Rails.application.config.assets.precompile += %w( scripts/core/lib/lz-string.js )
Rails.application.config.assets.precompile += %w( scripts/core/lib/packages/pretty.print.js )
Rails.application.config.assets.precompile += %w( author.js )
Rails.application.config.assets.precompile += %w( general.css )
Rails.application.config.assets.precompile += ['public/*']
Rails.application.config.assets.precompile += ['public/*/css/*.css']
Rails.application.config.assets.precompile += ['public/*/javascripts/*']
Rails.application.config.assets.precompile += ['scripts/*']
Rails.application.config.assets.precompile += ['scripts/plugins/widgets/**']

asset_iterator(WIDGET_ASSETS)
asset_iterator(PUBLIC_ASSETS, 'grunt')
asset_iterator(JS_ASSETS)
