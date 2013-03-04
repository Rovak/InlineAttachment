/**
 * Grunt Build File
 */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Project metadata, used by the <banner> directive.
        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        concat: {
            normal: {
                src: ['<banner>', 'src/inline-attach.js' ],
                dest: 'dist/inline-attach.js'
            },
            jquery: {
                src: ['<banner>', 'src/inline-attach.js', 'src/jquery.inline-attach.js' ],
                dest: 'dist/jquery.inline-attach.js'
            },
            codemirror: {
                src: ['<banner>', 'src/inline-attach.js', 'src/codemirror.inline-attach.js' ],
                dest: 'dist/codemirror.inline-attach.js'
            }
        },
        // Lists of files to be minified with UglifyJS.
        min: {
            normal: {
                src: [ '<banner>', 'dist/inline-attach.js' ],
                dest: 'dist/inline-attach.min.js',
                separator: ';'
            },
            jquery: {
                src: [ '<banner>', 'dist/jquery.inline-attach.js' ],
                dest: 'dist/jquery.inline-attach.min.js',
                separator: ';'
            },
            codemirror: {
                src: [ '<banner>', 'dist/codemirror.inline-attach.js' ],
                dest: 'dist/codemirror.inline-attach.min.js',
                separator: ';'
            }
        },
        lint: {
            files: ["src/*.js"],
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('qa', ['lint']);
    grunt.registerTask('default', ['qa', 'concat', 'min']);
};