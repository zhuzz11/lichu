module.exports = function(grunt) {

    //
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            src: 'src/public',
            dist: 'src/dist'
        },

        copy: {
            src: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: ['lib/**'],
                    dest: '<%= config.dist %>'
                }]
            },
            image: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: ['img/*.{png,jpg,jpeg,gif}', 'img/*/*.{png,jpg,jpeg,gif}'],
                    dest: '<%= config.dist %>'
                }]
            }
        },


        concat: {
            options: {
                stripBanners: true
            },
            js: {
                src: [
                    "<%= config.src %>/js/app.js",
                    "<%= config.src %>/js/*.js",
                    "<%= config.src %>/js/**/*.js",
                    "<%= config.src %>/js/**/**/*.js"
                ],
                dest: "<%= config.dist %>/js/all.js"
            },
            css: {
                src: [
                    "<%= config.src %>/css/*.css"
                ],
                dest: "<%= config.dist %>/css/all.css"
            }
        },

        uglify: {
            build: {
                src: '<%= config.dist %>/js/all.js',
                dest: '<%= config.dist %>/js/all.min.js'
            }
        },

        cssmin: {
            css: {
                src: '<%= config.dist %>/css/all.css',
                dest: '<%= config.dist %>/css/all.min.css'
            }
        },

        //
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: false,
                removeRedundantAttributes: false,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>/templates',
                        src: '**/*.html',
                        dest: '<%= config.dist %>/templates'
                    }
                ]
            }
        }

    });
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', [
        'copy', //
        'concat', //
        'cssmin', //
        'uglify', //J
        'htmlmin' //HTML
    ]);

    grunt.registerTask('test', [
        'copy',
        'concat',
        'uglify',
        'cssmin',
        'htmlmin'
    ]);
}