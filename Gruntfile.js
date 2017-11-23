module.exports = (grunt)=> {

grunt.registerTask("default", ["concat", "watch"]);

grunt.initConfig({
  concat: {
    dist: {
      src: ['pomodoro.js','pomodoro2.js'],
      dest: 'build/scripts.js',
    },
  },
  watch: {
	  js: {
	    files: ['*.js'],
	    tasks: ['concat'],
	  },
	},
});


grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');

};
