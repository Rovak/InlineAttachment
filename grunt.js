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
            dist: {
                src: ['<banner>', 'src/inline-attach.js', 'src/jquery.inline-attach.js' ],
                dest: 'dist/jquery.inline-attach.js'
            }
        },
        // Lists of files to be minified with UglifyJS.
        min: {
            dist: {
                src: [ '<banner>', 'dist/jquery.inline-attach.js' ],
                dest: 'dist/jquery.inline-attach.min.js',
                separator: ';'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'min']);
};