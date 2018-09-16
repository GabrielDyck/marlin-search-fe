module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        watch: {
            src: {
                files: ['app/script.js', './app/services/*.js', './app/controllers/*.js', './app/directive/*.js', './app/styles/*.css', 'Gruntfile.js'],
                tasks: ['uglify', 'concat']
            }
        },





        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['jsm/*.js'],
                dest: 'app/dist/built.js'
            }
        },
        uglify: {
            files: {
                src: ['app/controllers/*.js', 'app/directive/*.js', 'app/services/*.js'],  // source files mask
                dest: 'jsm/',    // destination folder
                expand: true,    // allow dynamic building
                flatten: true,   // remove all unnecessary nesting
                ext: '.min.js'   // replace .js to .min.js
            }
        },

        shell: {
            target: {
                command: 'nohup grunt watch & \n npm start'
            }
        }
    });

// load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

// register at least this one task
    grunt.registerTask('uglifyTask', ['uglify']);
    grunt.registerTask('start', ['shell']);
    grunt.registerTask('concatTask', ['concat']);


};