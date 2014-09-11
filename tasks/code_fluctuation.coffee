###
 * grunt-code-fluctuation
 * https://github.com/kozy4324/grunt-code-fluctuation
 *
 * Copyright (c) 2014 Koji NAKAMURA
 * Licensed under the MIT license.
###
module.exports = (grunt) ->
  grunt.registerTask 'code_fluctuation', 'Show the code fluctuation graph of git repository.', ->
    options = @options
      port: 0xBEEF
      hostname: 'localhost'
      processMaxBuffer: 200*1024
      graphMaxY: undefined

    grunt.config.merge
      connect:
        code_fluctuation:
          options:
            port: options.port
            hostname: options.hostname
            keepalive: true
            middleware: (connect, options) ->
              data = ''
              {exec} = require 'child_process'
              command = 'git log --no-merges --stat | egrep "files? changed"'
              exec command, {maxBuffer: options.processMaxBuffer}, (e, o) ->
                grunt.fatal e if e?
                data = o.toString('utf8').replace(/\n$/, '')
              return [
                (req, res, next) ->
                  res.setHeader 'Content-Type', 'text/html'
                  res.end tmpl data: data, graphMaxY: options.graphMaxY
              ]

    grunt.file.setBase "#{__dirname}/../"
    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.task.run 'connect:code_fluctuation'

tmpl = (data) -> """
<script src="http://ccchart.com/js/ccchart.js" charset="utf-8"></script>
<canvas id="chart"></canvas>
<textarea id="ta">#{data.data}</textarea>
<script>
var data = document.getElementById("ta").value;
data = data.split("\\n").reverse();
var nums = data.map(function(line, i){ return i + 2; });
nums.unshift("", 1);
var sum = 0;
var values = data.map(function(line){
  if(line.match(/(\\d+) insertion/)){ sum += +RegExp.$1; }
  if(line.match(/(\\d+) deletion/)){ sum -= +RegExp.$1; }
  return sum;
});
values.unshift("", 0);
var o = {
  config: {
    maxY: #{data.graphMaxY},
    width: document.body.offsetWidth,
    height: document.body.offsetHeight,
    type: "bezi2",
    bgGradient: {direction: "vertical", from:"#222", to:"#687478"}
  },
  data: [nums, values]
};
ccchart.init('chart', o);
</script>
"""
