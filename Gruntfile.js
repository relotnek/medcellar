
var db = require('./grunt/db/db');
var _ = require('underscore');


var users = [
	{
		username: 'ktoler',
		email: 'ken@medcellar.com',
		password: 'slapdabass'
	},
	{
		username: 'bob',
		email: 'bob@medcellar.com',
		password: 'bobdole'
	},
	{
		username: 'gellerb',
		email: 'geller@medcellar.com',
		password: 'magellan'
	},
];

module.exports = function(grunt) {
	grunt.initConfig({
	  exec: {
	    dropdb: 'mongo meddb --eval "db.dropDatabase()"'
	  }
	});
	grunt.loadNpmTasks('grunt-exec');
	grunt.registerTask('builddb', 'populate the database', function() {
		//BUILD DB
		var done = this.async();
		_.each(users, function(insertion){
		var user = new db.user({ username: insertion.username, email: insertion.email , password: insertion.password });
		console.log(user);
		user.save(function(err){
			if(err){
				console.log(err);
			} else {
				console.log("User: " + user.username + " Saved.");
			}
			done();
		});
		});
	});

};