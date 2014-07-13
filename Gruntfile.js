/**
 * Grunt Build File
 */
module.exports = function(grunt) {

  var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %> */\n';

  // Project configuration.
  grunt.initConfig({
    pkg: require('./package.json'),
    concat: {
      options: {
        banner: banner
      },
      normal: {
        src: ['<banner>', 'src/inline-attachment.js'],
        dest: 'dist/inline-attachment.js'
      },
      jquery: {
        src: ['<banner>', 'src/inline-attachment.js', 'src/jquery.inline-attachment.js'],
        dest: 'dist/jquery.inline-attachment.js'
      },
      codemirror: {
        src: ['<banner>', 'src/inline-attachment.js', 'src/codemirror.inline-attachment.js'],
        dest: 'dist/codemirror.inline-attachment.js'
      },
      angularjs: {
        src: ['<banner>', 'src/inline-attachment.js', 'src/angularjs.inline-attachment.js'],
        dest: 'dist/angularjs.inline-attachment.js'
      }
    },
    // Lists of files to be minified with UglifyJS.
    uglify: {
      options: {
        banner: banner
      },
      normal: {
        src: ['<banner>', 'dist/inline-attachment.js'],
        dest: 'dist/inline-attachment.min.js',
        separator: ';'
      },
      jquery: {
        src: ['<banner>', 'dist/jquery.inline-attachment.js'],
        dest: 'dist/jquery.inline-attachment.min.js',
        separator: ';'
      },
      codemirror: {
        src: ['<banner>', 'dist/codemirror.inline-attachment.js'],
        dest: 'dist/codemirror.inline-attachment.min.js',
        separator: ';'
      },
      angularjs: {
        src: ['<banner>', 'dist/angularjs.inline-attachment.js'],
        dest: 'dist/angularjs.inline-attachment.min.js',
        separator: ';'
      }
    },
    jshint: {
      all: ['src/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        undef: true,
        unused: true,
        strict: true,
        trailing: true,
        indent: 2
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('qa', ['jshint']);
  grunt.registerTask('default', ['qa', 'concat', 'uglify']);
};