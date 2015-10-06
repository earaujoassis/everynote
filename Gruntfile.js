module.exports = function (grunt) {

    grunt.initConfig({

        meta: {
            banner: [
                '/*\n',
                ' *  Everynote\n',
                ' *\n',
                ' *  Copyright (c) <%= grunt.template.today("yyyy") %> Ewerton Assis <hello@dearaujoassis.com>\n',
                ' *  MIT License\n',
                ' */\n'].join('')
        },

        watch: {
            javascripts: {
                files: ['public/javascripts/**.js', '!public/javascripts/**.min.js'],
                tasks: ['jshint', 'uglify']
            },
            stylesheets: {
                files: ['public/stylesheets/**.less'],
                tasks: ['less']
            }
        },

        jshint: {
            files: ['public/javascripts/**.js', '!public/javascripts/**.min.js'],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/javascripts',
                    src: '**/*.js',
                    dest: 'public/javascripts',
                    ext: '.min.js'
                }]
            }
        },

        less: {
            options: {
                paths: ['public/stylesheets'],
                compress: true,
                cleancss: true
            },
            src: {
                expand: true,
                cwd: 'public/stylesheets/',
                src: '*.less',
                dest: 'public/stylesheets/',
                ext: '.css'
            }
        },

        nodemon: {
            web: {
                script: 'app.js',
                options: {
                    file: 'app.js',
                    ignore: ['README.md', 'Procfile', 'bower.json', 'public/**'],
                    watch: ['api', 'config', 'node_modules', '!public'],
                    delayTime: 1,
                    cwd: __dirname
                }
            }
        },

        concurrent: {
            target: {
                tasks: ['watch', 'nodemon:web'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        seed: {
            development: {
                options: {
                    database: 'api/database',
                    modelsFolder: 'api/models/',
                    seedData: 'tasks/seed',
                    cwd: __dirname
                }
            }
        },

        mochaTest: {
            unit: {
                options: {
                    reporter: 'spec'
                },
                src: ['tests/unit/*.js']
            }
        }

    });

    grunt.task.loadTasks('tasks/');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-mocha-test');


    grunt.registerTask('assets', ['jshint', 'uglify', 'less']);
    grunt.registerTask('server', ['assets', 'nodemon:web']);
    grunt.registerTask('server:watch', ['concurrent']);
    grunt.registerTask('default', ['server']);
    grunt.registerTask('test:unit', ['mochaTest:unit']);
    grunt.registerTask('test', ['test:unit']);

};
