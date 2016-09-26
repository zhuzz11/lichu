module.exports = function(grunt) {

    //
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            src: 'src',
            dist: 'dist'
        },

        copy: {
            src: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: ['*.*'],
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: ['public/lib/**'],
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: ['node_modules/**'],
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: ['routes/**'],
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: ['tools/**'],
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: ['views/**'],
                    dest: '<%= config.dist %>'
                }]
            },
            image: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: ['public/img/*.{png,jpg,jpeg,gif}', 'img/*/*.{png,jpg,jpeg,gif}'],
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
                    "<%= config.src %>/public/js/app.js",
                    "<%= config.src %>/public/js/*.js",
                    "<%= config.src %>/public/js/**/*.js",
                    "<%= config.src %>/public/js/**/**/*.js"
                ],
                dest: "<%= config.dist %>/public/js/all.js"
            },
            css: {
                src: [
                    "<%= config.src %>/public/css/*.css"
                ],
                dest: "<%= config.dist %>/public/css/all.css"
            }
        },

        uglify: {
            build: {
                src: '<%= config.dist %>/public/js/all.js',
                dest: '<%= config.dist %>/public/js/all.min.js'
            }
        },

        cssmin: {
            css: {
                src: '<%= config.dist %>/public/css/all.css',
                dest: '<%= config.dist %>/public/css/all.min.css'
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
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/public/templates',
                    src: '**/*.html',
                    dest: '<%= config.dist %>/public/templates'
                }]
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
        'htmlmin', //HTML
        'makeTimestamp'
    ]);

    var file_dir_List = [
        "dist/views/index.html",
    ];
    var timestamp = "123";

    grunt.registerTask('makeTimestamp', '给每次发版需要更新的文件打时间戳的任务', function() {
        timestamp = new Date().getTime();
        var replaceTask = function(url) {
            var old = grunt.file.read(url);
            //?_t={timestamp}如果需要加时间戳，就在文件的url后面加上这个:  ?_t=
            var newFile = old.replace(/\?_t=/gm, "?_t=" + timestamp);

            grunt.file.write(url, newFile);
        };

        for (var i = 0; i < file_dir_List.length; i++) {
            var url = file_dir_List[i];
            if (grunt.file.isDir(url)) {
                var fileArray = grunt.file.expand(url + "/*.js");
                for (var j = 0; j < fileArray.length; j++) {
                    var fileUrl = fileArray[j];
                    if (grunt.file.isFile(fileUrl)) {
                        replaceTask(fileUrl);
                    }
                }
            } else if (grunt.file.isFile(url)) {
                replaceTask(url);
            }
        }
    });


}