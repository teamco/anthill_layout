const {environment} = require('@rails/webpacker');
const merge = require('webpack-merge');
const webpack = require('webpack');

environment.plugins.prepend('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  jquery: 'jquery',
  'window.jQuery': 'jquery',
  'window.Tether': 'tether',
  Popper: ['popper.js', 'default'],
  html2canvas: 'html2canvas'
}));

environment.loaders.append('expose', {
  test: require.resolve('jquery'),
  use: [
    {
      loader: 'expose-loader',
      options: '$'
    }
  ]
});

environment.loaders.get('sass').use.splice(-1, 0, {
  loader: 'resolve-url-loader',
  options: {
    attempts: 0
  }
});

const envConfig = module.exports = environment;
const aliasConfig = module.exports = {
  resolve: {
    alias: {
      pace: 'pace-progress'
    }
  }
};

module.exports = merge(envConfig.toWebpackConfig(), aliasConfig);
module.exports = environment;
