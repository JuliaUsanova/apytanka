/**
 * Created by юля on 13.11.2014.
 */

module.exports = function(grunt) {
    // Do grunt-related things in here

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    targetDir: './app/bower_components',
                    layout: 'byType',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    bowerOptions: {}
                }
            }
        },

        watch: {
            compass: {
                files: ['app/css/**/*.{scss,sass}'],
                tasks: ['compass:dev']
            }
            ,
            js: {
                files: ['app/js/**/*.js'],
                tasks: ['uglify']
            },

            karma: {
                files: ['app/test/unit/*.js'],
                tasks: ['karma:unit:run'] //NOTE the :run flag
            }
        },

        compass: {
//            basePath: '/',
//            compile: {
//                options: {
//                    basePath: './app/css',
//                    config: './app/css/sass/config.rb'
//                }
//            },
            prod: {                   // Target
                options: {              // Target options
                    sassDir: ['app/css/sass'],
                    cssDir: ['app/css/stylesheets'],
                    environment: 'production'
                }
            },// Task
            dev: {                    // Another target
                options: {
                    sassDir: ['app/css/sass'],
                    cssDir: ['app/css/stylesheets'],
                    config: 'app/css/config.rb',
                    environment: 'development',
                    force: true
                }
            }
        },

        uglify: {
            all: {
                files: {
                    'js/min/main.min.js': [

                    ]
                }
            }
        },

        protractor: {
            options: {
                configFile: "conf.js", // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    framework: 'jasmine',
//    directConnect: true,
                    capabilities: {
                        browserName: 'firefox'
                    },
                    chromeDriver: 'C:/Users/юля/AppData/Roaming/npm/node_modules/protractor/selenium/chromedriver',
                    seleniumAddress: 'http://localhost:4444/wd/hub',
                    specs: ['test/e2e/*_spec.js'] // Arguments passed to the command
                }
            },
            your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: "conf.js", // Target-specific config file
                    args: {} // Target-specific arguments
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true,
                singleRun: false
            }
        }



    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('dev', ['compass:dev']);

    grunt.registerTask('default', ['bower', 'dev' , 'uglify' , 'watch']);

};


