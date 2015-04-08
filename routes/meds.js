var mongo = require('mongodb');
var sanitizer = require('sanitizer');
var config = require(process.env.MED_CONF);

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('meddb', server, {safe: true});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving med: ' + id);
    db.collection('meds', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    if(req.user['role']=='admin'){
        db.collection('meds', function(err, collection) {
            collection.find().toArray(function(err, items) {
                res.send(items);
            });
        });
    }else if(req.user['role'] == 'user'){
        db.collection('meds',function(err,collection){
            collection.find({'isPrescription':false}).toArray(function(err, items) {
                res.send(items);
            });
        });
    }else{
        res.status(200).send("No Items Found");
    }
};

exports.addMed = function(req, res) {
    var med = req.body;
    console.log('Adding med: ' + JSON.stringify(med));
    db.collection('meds', function(err, collection) {
        collection.insert(med, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.updateMed = function(req, res) {
    var id = req.params.id;
    var med = req.body;
    if( config.environment === 'development'){
        for(var i in med){
            med[i] = sanitizer.sanitize(med[i]);
        }
    }
    delete med._id;
    console.log('Updating med: ' + id);
    console.log(JSON.stringify(med));
    db.collection('meds', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, med, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating med: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(med);
            }
        });
    });
};

exports.deleteMed = function(req, res) {
    var id = req.params.id;
    console.log('Deleting med: ' + id);
    db.collection('meds', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};