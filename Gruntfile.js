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
        uglify: {
            options: {
                banner: banner
            },
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
                indent: 4
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('qa', ['jshint']);
    grunt.registerTask('default', ['qa', 'concat', 'uglify']);
};