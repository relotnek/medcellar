var mongo = require('mongodb');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('meddb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'meddb' database");
        db.collection('users', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});


var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
});

userSchema.pre('save', function(next){
    var use = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
        user.password = hash;
        next();
    });
});


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving med: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, user) {
            res.send(user);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, users) {
            res.send(users);
        });
    });
};

exports.addUser = function(req, res) {
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
}

exports.updateUser = function(req, res) {
    var id = req.params.id;
    var med = req.body;
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
}

exports.deleteUser = function(req, res) {
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
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {


    var User = mongoose.model('User', userSchema);
    var user = new User({ username: 'ktoler', email: 'ktoler@ktoler.com', password: 'slapdabass'});
    user.save(function(err){
        if(err){
            console.log(err);
        } else {
            console.log('user: ' + user.username + ' saved.');
        }
    });

    var user2 = new User({ username: 'bob', email: 'bob@bob.com', password: 'nobass'});
    user2.save(function(err){
        if(err){
            console.log(err);
        } else {
            console.log('user: ' + user.username + ' saved.');
        }
    });

};