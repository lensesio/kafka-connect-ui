'use strict';

module.exports = function (grunt) {

  require('jit-grunt')(grunt, {});

  grunt.loadNpmTasks('grunt-cache-breaker');
  // Define the configuration
  grunt.initConfig({

    // Project settings
    bower: grunt.file.readJSON('bower.json'),

    clean: {
      src: ['dist']
    },

    copy: {
      files: {
        cwd: '.',
        src: [
          'index.html',
          'src/assets/**',
          'src/**/*.html',
          'src/**/**/*.html',
          'src/**/**/**/*.html',
          'src/**/**/**/**/*.html',
          'src/*.html',
          'env.js',
          'bower_components/angular/angular.min.js',
          'bower_components/angular/angular.min.js.map',                 // Include source-maps
          'bower_components/angular-route/angular-route.min.js',
          'bower_components/angular-route/angular-route.min.js.map',     // Include source-maps
          'bower_components/angular-animate/angular-animate.min.js',
          'bower_components/angular-animate/angular-animate.min.js.map', // Include source-maps
          'bower_components/angular-aria/angular-aria.min.js',
          'bower_components/angular-aria/angular-aria.min.js.map',       // Include source-maps
          'bower_components/angular-material/angular-material.min.css',
          'bower_components/font-awesome/css/font-awesome.min.css',
          'bower_components/components-font-awesome/**',
          'bower_components/font-awesome/fonts/**',
          'bower_components/ace-builds/src-min-noconflict/ace.js',
          'bower_components/ace-builds/src-min-noconflict/ext*.js',
          'bower_components/ace-builds/src-min-noconflict/mode-json.js',
          'bower_components/ace-builds/src-min-noconflict/mode-batchfile.js',
          'bower_components/ace-builds/src-min-noconflict/theme-chrome.js',
          'bower_components/ace-builds/src-min-noconflict/worker-json.js',
          'bower_components/ace-builds/src-min-noconflict/mode-properties.js',
          'bower_components/angular-ui-ace/ui-ace.min.js',
          'bower_components/angular-material/angular-material.min.js',
          'bower_components/angularUtils-pagination/dirPagination.js',
          'bower_components/angular-google-chart/ng-google-chart.min.js',
          'bower_components/angular-messages/angular-messages.min.js'
        ],
        dest: 'dist',
        expand: true
      }
    },

    concat: {
      dist: {
        src: ['src/supported-connectors.js', 'src/factories/dirPagination.js', 'src/app.js', 
        'src/**/*-factory.js','src/**/*.factory.js', 'src/**/*.controller.js', 'src/**/**/*.controller.js', 
        'src/**/**/**/*.controller.js','src/**/**/**/*.component.js', 'src/**/**/**/*.filter.js','src/**/**/**/*.service.js'],
        dest: 'dist/src/combined.js'
      }
    },

    cachebreaker: {
        js: {
            options: {
                match: ['combined.js'],
                replacement: 'md5',
                src: {
                    path: 'dist/src/combined.js'
                }
            },
            files: {
                src: ['dist/index.html']
            }
        }
     },

    usemin: {
      html: ['dist/index.html']
    }

  });

  grunt.registerTask('default', [
    'clean',
    'copy',
    'concat',
    'usemin',
    'cachebreaker'
  ]);
};
