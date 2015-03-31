var express = require('express'),
    path = require('path'),
    http = require('http'),
    passport = require('passport');
    med = require('./routes/meds');
    user = require('./routes/users');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(express.session({secret: 'applesandpears'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname,'public')));
});

// TODO - Externalize /populate in Grunt:build with direct db calls - Reference authentication-md5
app.get('/populate', user.dbBuild);
app.post('/login', user.ensureAuth, user.login);
app.get('/meds', user.ensureAuth, med.findAll);
app.get('/meds/:id', user.ensureAuth, med.findById);
app.post('/meds', user.ensureAuth, med.addMed);
app.put('/meds/:id', user.ensureAuth, med.updateMed);
app.delete('/meds/:id', user.ensureAuth, med.deleteMed);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});