'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    var omConfig = {
        assets: 'assets',
        dist: 'dist'
    };

    grunt.initConfig({
        om: omConfig,
        watch: {
            compass: {
                files: ['<%= om.assets %>/css/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '*.html',
                    '{.tmp,<%= om.assets %>}/css/{,*/}*.css',
                    '{.tmp,<%= om.assets  %>}/js/{,*/}*.js',
                    '<%= om.assets %>/img/{,*/}*.{png,jpg,jpeg,webp}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, '') //app
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'dist')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= om.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= om.assets %>/js/{,*/}*.js',
                '!<%= om.assets %>/js/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                sassDir: '<%= om.assets %>/css',
                cssDir: '.tmp/<%= om.assets %>/css',
                imagesDir: '<%= om.assets %>/img',
                javascriptsDir: '<%= om.assets %>/js',
                fontsDir: '<%= om.assets %>/css/fonts',
                importPath: 'components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        requirejs: {
            dist: {
                options: {
                    baseUrl: 'assets/js',
                    optimize: 'none',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }
        },
        useminPrepare: {
            html: '/index.html',
            options: {
                dest: '<%= om.dist %>'
            }
        },
        usemin: {
            html: ['<%= om.dist %>/{,*/}*.html'],
            css: ['<%= om.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= om.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= om.assets %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= om.dist %>/img'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= om.dist %>/css/main.css': [
                        '.tmp/css/{,*/}*.css',
                        '<%= om.assets %>/css/{,*/}*.css'
                    ]
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= om.assets %>',
                    dest: '<%= om.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= om.assets %>/js/main.js'
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'compass:server',
            'livereload-start',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'compass',
        'connect:test'
        //'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
