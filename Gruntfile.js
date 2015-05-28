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
        src: ['<banner>', 'src/inline-attachment.js', 'src/input.inline-attachment.js'],
        dest: 'dist/inline-attachment.js'
      },
      jquery: {
        src: ['<banner>', 'src/inline-attachment.js', 'src/jquery.inline-attachment.js'],
        dest: 'dist/jquery.inline-attachment.js'
      },
      codemirror3: {
        src: ['<banner>', 'src/inline-attachment.js', 'src/codemirror-3.inline-attachment.js'],
        dest: 'dist/codemirror-3.inline-attachment.js'
      },
      codemirror4: {
        src: ['<banner>', 'src/inline-attachment.js', 'src/codemirror-4.inline-attachment.js'],
        dest: 'dist/codemirror-4.inline-attachment.js'
      },
      angularjs: {
        src: ['<banner>', 'src/inline-attachment.js', 'src/input.inline-attachment.js', 'src/angularjs.inline-attachment.js'],
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
      codemirror3: {
        src: ['<banner>', 'dist/codemirror-3.inline-attachment.js'],
        dest: 'dist/codemirror-3.inline-attachment.min.js',
        separator: ';'
      },
      codemirror4: {
        src: ['<banner>', 'dist/codemirror-4.inline-attachment.js'],
        dest: 'dist/codemirror-4.inline-attachment.min.js',
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
    },
    casperjs: {
      options: {
      },
      files: ['tests/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-casperjs');

  grunt.registerTask('qa', ['jshint']);
  grunt.registerTask('default', ['qa', 'concat', 'uglify']);
};
