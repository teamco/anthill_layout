process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const environment = require('./environment');
const merge = require('webpack-merge');
const webpack = require('webpack');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

if (module.hot) {
  environment.plugins.append(
      'HMR',
      new webpack.HotModuleReplacementPlugin()
  );
} else {
  // environment.loaders.get('sass').use.find(item => item.loader === 'sass-loader').options.sourceMapContents = false;
}

// const bundle = {
//   plugins: [
//     new BundleAnalyzerPlugin()
//   ]
// };

module.exports = merge(environment.toWebpackConfig(), {});