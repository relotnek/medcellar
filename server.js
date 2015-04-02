var express = require('express'),
    path = require('path'),
    http = require('http'),
    helmet = require('helmet'),
    sanitizer = require('sanitizer'),
    passport = require('passport'),
    med = require('./routes/meds'),
    user = require('./routes/users'),
    config = require(process.env.MED_CONF);

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    if (config.environment === 'development') {
        app.use(helmet.hidePoweredBy());
        app.use(helmet.noCache());
        app.use(helmet.noSniff());
        app.use(helmet.frameguard());
    }
    app.use(express.session({
        secret: 'applesandpears'
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/login', function(req,res){
    res.redirect('/#login');
});
app.post('/login', user.login);
app.get('/meds', user.ensureAuth, med.findAll);
app.get('/meds/:id', user.ensureAuth, med.findById);
app.post('/meds', user.ensureAuth, med.addMed);
app.put('/meds/:id', user.ensureAuth, med.updateMed);
app.delete('/meds/:id', user.ensureAuth, med.deleteMed);
app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});