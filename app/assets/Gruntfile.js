/**
 * Created by Tkachv on 3/19/2017.
 */
/*jslint node: true */
'use strict';

var createFolderGlobs = function(fileTypePatterns) {
  fileTypePatterns =
      Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
  var ignore = ['node', 'node_modules'];
  var fs = require('fs');
  return fs.readdirSync(process.cwd()).map(function(file) {
    if (ignore.indexOf(file) !== -1 || !file.indexOf('.') ||
        !fs.lstatSync(file).isDirectory()) {
      return null;
    } else {
      return fileTypePatterns.map(function(pattern) {
        return file + '/**/' + pattern;
      });
    }
  }).filter(function(patterns) {
    return patterns;
  }).concat(fileTypePatterns);
};

module.exports = function(grunt) {

  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
  var rewriteRulesSnippet = require(
      'grunt-connect-rewrite/lib/utils').rewriteRequest;

  // Project configuration.

  grunt.initConfig({
    connect: {
      options: {
        port: 3000,
        hostname: 'localhost',
        logger: 'dev'
      },
      rules: [
        {from: '^/assets/scripts/(.*)$', to: '/javascripts/scripts/$1'},
        {from: '^/assets/public/(.*)$', to: '/javascripts/public/$1'},
        {from: '^/assets/services/(.*)$', to: '/javascripts/services/$1'},
        {from: '^/assets/stylesheets/(.*)$', to: '/stylesheets/$1'},
        {from: '^/fonts/(glyphicons-halflings-regular.*)$', to: '/javascripts/scripts/core/lib/packages/bootstrap/fonts/$1'},
        {from: '^/fonts/(fontawesome-webfont.*)$', to: '/javascripts/scripts/core/lib/packages/font-awesome/fonts/$1'}
      ],
      local: {
        options: {
          middleware: function(connect, options) {
            // inject a custom middleware into the array of default middlewares.
            var middlewares = [];

            // RewriteRules support
            middlewares.push(rewriteRulesSnippet);

            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            var directory = options.directory ||
                options.base[options.base.length - 1];
            options.base.forEach(function(base) {
              // Serve static files.
              middlewares.push(serveStatic(base));
            });

            // Make directory browse-able.
            middlewares.push(serveIndex(directory));

            return middlewares;
          }
        },
        proxies: [
          // {
          //   context: '*',
          //   host: 'localhost',
          //   port: 3000
          // }
        ]
      }
    },
    watch: {
      main: {
        options: {
          livereload: true,
          livereloadOnError: false,
          spawn: false
        },
        files: [createFolderGlobs(['javascripts/**.js', 'stylesheets/**.css'])],
        tasks: [] //all the tasks are run dynamically during the watch event handler
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'stylesheets/output.css': [
            'javascripts/scripts/core/lib/packages/font-awesome/font-awesome.min.css',
            'javascripts/scripts/core/lib/packages/bootstrap/css/animate.css',
            'javascripts/scripts/core/lib/packages/bootstrap/css/bootstrap-theme.min.css',
            'javascripts/scripts/core/lib/packages/bootstrap/css/bootstrap.min.css',
            'javascripts/scripts/core/stylesheets/general.css',
            'javascripts/scripts/core/stylesheets/cover.css',
            'javascripts/scripts/core/stylesheets/jquery-ui.min.css',
            'javascripts/scripts/core/stylesheets/modal.css',
            'javascripts/scripts/core/stylesheets/page.css',
            'javascripts/scripts/core/stylesheets/renderer.css',
            'javascripts/scripts/core/stylesheets/reset.css',
            'javascripts/scripts/core/stylesheets/tooltip.css',
            'javascripts/scripts/core/stylesheets/widget.css',
            'javascripts/scripts/core/stylesheets/workspace.css',
            'javascripts/scripts/plugins/stylesheets/combined.css'
          ]
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'stylesheets/shared.css': 'stylesheets/shared.scss'
        }
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'stylesheets/shared.css': 'stylesheets/shared.scss'
        }
      }
    },
    open: {
      dev: {
        path: 'http://localhost:3000/index.html',
        app: 'chrome'
      }
    },
    exec: {
      rails: {
        command: 'rails server'
      },
      python: {
        command: 'python -m SimpleHTTPServer 3000'
      }
    }
  });

  grunt.registerTask('default', ['cssmin', 'sass:dist', 'open:dev', 'watch']);
  grunt.registerTask('rails', ['exec:rails', 'default']);
  grunt.registerTask('python', ['exec:python', 'default']);
  grunt.registerTask('server',
      ['configureRewriteRules', 'connect:local', 'default']);

  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect-route');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-connect-rewrite');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
};