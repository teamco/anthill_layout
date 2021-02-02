const html = require('remark-html');
const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'remark-loader',
            options: {
              remarkOptions: {
                plugins: [html]
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, '..', '..', 'node_modules'), 'node_modules'],
    alias: {
      'app': path.resolve(__dirname, '..', '..', 'app'),
      'js': path.resolve(__dirname, '..', '..', 'app/javascript/packs/'),
      'lib': path.resolve(__dirname, '..', '..', './app/javascript/packs/lib/'),
      'config': path.resolve(__dirname, '..', '..', './app/javascript/packs/core/config/'),
      'test': path.resolve(__dirname, '..', '..', './test/unit/')
    }
  }
};
