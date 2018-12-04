const {environment} = require('@rails/webpacker');
const merge = require('webpack-merge');
const webpack = require('webpack');

environment.plugins.append(
    'Provide',
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.Tether': 'tether',
      Popper: ['popper.js', 'default'],
      html2canvas: 'html2canvas'
    })
);

// environment.loaders.append('expose', {
//   test: require.resolve('jquery'),
//   use: [
//     {
//       loader: 'expose-loader',
//       options: '$'
//     },
//     {
//       loader: 'expose-loader',
//       options: 'jQuery'
//     }
//   ]
// });
//
environment.loaders.append('imports-loader', {
  test: require.resolve("jquery"),
  loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'
});

environment.loaders.get('sass').use.splice(-1, 0, {
  loader: 'resolve-url-loader',
  options: {
    sourceMap: true,
    sourceMapContents: false
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
