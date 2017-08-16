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
Dir.glob(Rails.root.join('app', 'assets', 'scripts', 'plugins', 'widgets', '**')).each do |path|
  Rails.application.config.assets.paths << path
end