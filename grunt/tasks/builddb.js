
	//BUILD DB

	var db = require('../db/db');

	var builddb = function(){
	var user = new db.user({ username: 'ktoler', email: 'ktoler@ktoler.com', password: 'slapdabass'});
	console.log(user);
    user.save(function(err){
    	if(err){
    		console.log(err);
    	} else {
    		console.log("User: " + user.username + " Saved.");
    	}
    });

    exports.builddb = builddb();
	};