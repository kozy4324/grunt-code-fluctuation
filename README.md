# grunt-code-fluctuation

> Show the code fluctuation graph of git repository in brwoser. This plugin is just a toy program.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-code-fluctuation --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-code-fluctuation');
```

## The "code_fluctuation" task

### Overview
In your project's Gruntfile, add a section named `code_fluctuation` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  code_fluctuation: {
    options: {
      // Task-specific options go here.
    }
  },
});
```

### Options

#### options.processMaxBuffer
Type: `Number`
Default value: `200*1024`

The value that is passed to maxBuffer option of child process executing `git log`.

#### options.graphMaxY
Type: `Number`
Default value: `undefined`

The value that is passed to the script rendering a graph on html.
