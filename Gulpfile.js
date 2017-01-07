const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack = require("webpack");
var path = require("path");

function webpackOptions(options) {
  return {
    watch: options.watch,
    entry: {
      "angular": './src/angular/angular-1.js',
      "input": './src/input/main.js',
      "jquery": './src/jquery/jquery.js',
      "codemirror-3": './src/codemirror-3/main.js',
      "codemirror-4": './src/codemirror-4/codemirror-4.js',
    },
    devtool: options.debug ? 'inline-source-map' : '',
    debug: options.debug,
    output: {
      path: __dirname + "/dist",
      filename: "[name].js",
      publicPath: options.publicPath,
    },
    resolve: {
      root: [
        path.join(__dirname, "packages")
      ],
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, "src")
          ],
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
  };
}

gulp.task("default", function (callback) {
  webpack(webpackOptions({
    watch: false,
    debug: false
  }), function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString());
    callback();
  });
});

gulp.task("watch", function () {
  webpack(webpackOptions({
    watch: true,
    debug: true
  }), function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString());
  });
});
