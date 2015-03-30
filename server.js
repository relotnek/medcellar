var express = require('express'),
    path = require('path'),
    http = require('http'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    med = require('./routes/meds');

var app = express();

passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({ username: username }, function(err,user){
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, {message: 'Incorrect Username.'});
			}
			if(!user.validPassword(password)) {
				return done(null, false,{ message: 'Incorrect password.'});
			}
			return done(null,user);
			});
		}
	));

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/meds', med.findAll);
app.get('/meds/:id', med.findById);
app.post('/meds', med.addMed);
app.put('/meds/:id', med.updateMed);
app.delete('/meds/:id', med.deleteMed);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
