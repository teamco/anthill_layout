const {environment} = require('@rails/webpacker');
const merge = require('webpack-merge');
const webpack = require('webpack');
//const WebpackBar = require('webpackbar');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');

const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage, message, ...args);
};

environment.plugins.append(
    'Progress',
    new SimpleProgressWebpackPlugin()
    // new webpack.ProgressPlugin(handler)
);

environment.plugins.append(
    'Errors',
    new FriendlyErrorsWebpackPlugin()
);

environment.plugins.append(
    'Provide',
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      '_': 'underscore',
      'window._': 'underscore',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
      'window.Tether': 'tether',
      html2canvas: 'html2canvas',
      Popper: ['popper.js', 'default'],
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
      Util: 'exports-loader?Util!bootstrap/js/dist/util'
    })
);

environment.loaders.append('imports-loader', {
  test: require.resolve('jquery'),
  loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'
});

// environment.loaders.append('bootstrap.native-loader', {
//   test: /bootstrap\.native/,
//   use: {
//     loader: 'bootstrap.native-loader'
//   }
// });

// environment.loaders.append('css-loader', {test: /\.css$/});
environment.loaders.append('style-loader', {test: /\.css$/});
environment.loaders.append('to-string-loader', {test: /\.css$/});

const sassLoader = environment.loaders.get('sass');

sassLoader.use.splice(-1, 0, {
  loader: 'resolve-url-loader',
  options: {
    sourceMap: true,
    sourceMapContents: false
  }
});

const nodeModulesPath = [path.resolve(__dirname, 'node_modules')];

sassLoader.use.find(loader => loader.loader === 'sass-loader').options.includePaths = nodeModulesPath;
// sassLoader.use.find(loader => loader.loader === 'css-loader').options = {
//   modules: true,
//   sourceMap: true,
//   importLoaders: 2,
//   localIdentName: '[name]__[local]___[hash:base64:5]'
// };

module.exports = environment;

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
