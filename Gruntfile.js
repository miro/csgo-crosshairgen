module.exports = function(grunt) {

    grunt.initConfig({

        sass: {
            compile: {        
                files: {
                    'css/ananassi.css': 'scss/ananassi.scss'
                }
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    'css/ananassi.css': 'css/ananassi.css'
                }
            }
        },

        watch: {
            scss: {
                files: 'scss/*.scss',
                tasks: ['sass', 'autoprefixer'],
                options: {
                    livereload: 1337,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    
};
