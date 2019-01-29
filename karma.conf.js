// Karma configuration
// Generated on Tue Jan 29 2019 23:25:56 GMT+0200 (Israel Standard Time)

module.exports = config => {
  config.set({
    plugins: [
      require('karma-jasmine'),
      require('karma-babel-preprocessor'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      'karma-*'
    ],
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'spec/**/*.spec.js',
      'app/javascript/packs/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
      'node_modules/**/*.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // add webpack as preprocessor
      'spec/**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      // webpack configuration
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.js'],
        alias: {}
      },
      module: {
        rules: [
          {
            test: /\.(svg|eot|ttf|woff|woff2|png)$/,
            use: 'file-loader'
          }, {
            test: /\.scss$/,
            loaders: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
            // exclude: [helpers.root('src/index.html')]
          },
          {
            test: /\.html$/,
            loader: 'raw-loader'
          }
        ]
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },

    babelPreprocessor: {
      options: {
        presets: ['env'],
        sourceMap: 'inline'
      },
      filename: file => file.originalPath.replace(/\.js$/, '.es5.js'),
      sourceFileName: file => file.originalPath
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
