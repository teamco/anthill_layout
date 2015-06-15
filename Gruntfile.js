/*
 * grunt-contrib-requirejs
 * http://gruntjs.com/
 *
 * Copyright (c) 2015 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            test: ['build/target']
        },

        // Configuration to be run (and then tested).
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'app/assets/javascripts/scripts/core',
                    name: 'config/main',
                    out: 'build/target/main.js'
                }
            },
            onOptimize: {
                options: {
                    baseUrl: 'app/assets/javascripts/scripts/core',
                    name: 'config/main',
                    out: 'build/target/main-onoptimize.js',
                    done: function(done, build) {
                        grunt.file.write('build/target/done-build.txt', build);
                        done();
                    }
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-internal');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'requirejs', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};