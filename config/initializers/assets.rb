Rails.application.config.assets.precompile += %w( scripts/core/lib/require.js )
Rails.application.config.assets.precompile += %w( scripts/core/lib/lz-string.js )
Rails.application.config.assets.precompile += %w( scripts/core/lib/packages/pretty.print.js )
Rails.application.config.assets.precompile += %w( author.js )
Rails.application.config.assets.precompile += ['public/*']
Rails.application.config.assets.precompile += ['target/*']