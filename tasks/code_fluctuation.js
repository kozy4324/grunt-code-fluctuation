
/*
 * grunt-code-fluctuation
 * https://github.com/kozy4324/grunt-code-fluctuation
 *
 * Copyright (c) 2014 Koji NAKAMURA
 * Licensed under the MIT license.
 */

(function() {
  var tmpl;

  module.exports = function(grunt) {
    return grunt.registerTask('code_fluctuation', 'Show the code fluctuation graph of git repository.', function() {
      var options;
      options = this.options({
        port: 0xBEEF,
        hostname: 'localhost',
        processMaxBuffer: 200 * 1024,
        graphMaxY: void 0
      });
      grunt.config.merge({
        connect: {
          code_fluctuation: {
            options: {
              port: options.port,
              hostname: options.hostname,
              keepalive: true,
              middleware: function(connect, options) {
                var command, data, exec;
                data = '';
                exec = require('child_process').exec;
                command = 'git log --no-merges --stat | grep "files changed"';
                exec(command, {
                  maxBuffer: options.processMaxBuffer
                }, function(e, o) {
                  if (e != null) {
                    grunt.fatal(e);
                  }
                  return data = o.toString('utf8').replace(/\n$/, '');
                });
                return [
                  function(req, res, next) {
                    res.setHeader('Content-Type', 'text/html');
                    return res.end(tmpl({
                      data: data,
                      graphMaxY: options.graphMaxY
                    }));
                  }
                ];
              }
            }
          }
        }
      });
      grunt.loadNpmTasks('grunt-contrib-connect');
      return grunt.task.run('connect:code_fluctuation');
    });
  };

  tmpl = function(data) {
    return "<script src=\"http://ccchart.com/js/ccchart.js\" charset=\"utf-8\"></script>\n<canvas id=\"chart\"></canvas>\n<textarea id=\"ta\">" + data.data + "</textarea>\n<script>\nvar data = document.getElementById(\"ta\").value;\ndata = data.split(\"\\n\").reverse();\nvar nums = data.map(function(line, i){ return i + 2; });\nnums.unshift(\"\", 1);\nvar sum = 0;\nvar values = data.map(function(line){\n  if(line.match(/(\\d+) insertion/)){ sum += +RegExp.$1; }\n  if(line.match(/(\\d+) deletion/)){ sum -= +RegExp.$1; }\n  return sum;\n});\nvalues.unshift(\"\", 0);\nvar o = {\n  config: {\n    maxY: " + data.graphMaxY + ",\n    width: document.body.offsetWidth,\n    height: document.body.offsetHeight,\n    type: \"bezi2\",\n    bgGradient: {direction: \"vertical\", from:\"#222\", to:\"#687478\"}\n  },\n  data: [nums, values]\n};\nccchart.init('chart', o);\n</script>";
  };

}).call(this);
