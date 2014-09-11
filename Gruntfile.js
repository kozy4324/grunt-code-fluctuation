/*
 * grunt-code-fluctuation
 * https://github.com/kozy4324/grunt-code-fluctuation
 *
 * Copyright (c) 2014 Koji NAKAMURA
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    coffee: {
      compile: {
        files: {
          'tasks/code_fluctuation.js': 'tasks/code_fluctuation.coffee'
        }
      }
    },

    code_fluctuation: {
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  grunt.registerTask('test', ['coffee', 'jshint', 'code_fluctuation']);
  grunt.registerTask('default', ['coffee', 'jshint']);
};
