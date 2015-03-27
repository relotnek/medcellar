var express = require('express'),
    path = require('path'),
    http = require('http'),
    med = require('./routes/meds');

var app = express();

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
