var mongoose = require('mongoose');
mongoose.connect('localhost','meddb');
var db = mongoose.connection;

module.exports = function(grunt) {

	grunt.registerTask('drop', 'drop the database', function() {
	// async mode
	var done = this.async();

	db.mongoose.connection.on('open', function () {
  		db.mongoose.connection.db.dropDatabase(function(err) {
    		if(err) {
      			console.log(err);
    		} else {
      			console.log('Successfully dropped db');
   			 }
    		db.mongoose.connection.close(done);
  		});
	});
	});
};