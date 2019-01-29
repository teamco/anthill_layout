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
      html2canvas: 'html2canvas',
      Popper: ['popper.js', 'default'],
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    })
);

environment.loaders.append('imports-loader', {
  test: require.resolve("jquery"),
  loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window'
});

environment.loaders.append('css-loader', {test: /\.css$/});
environment.loaders.append('style-loader', {test: /\.css$/});
environment.loaders.append('to-string-loader', {test: /\.css$/});

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
