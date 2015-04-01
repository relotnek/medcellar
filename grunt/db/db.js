var mongo = require('mongodb');
var mongoose = require('mongoose');
var crypto = require('crypto-js');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var SALT_WORK_FACTOR = 10;

mongoose.connect('localhost','meddb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Connected to Users');
});

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
});

var medSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true},
  classification: { type: String, required: false, unique: false},
  indication: { type: String, required: false, unique: false},
  supply: { type: String, required: false, unique: false},
  price: { type: Number, required: false, unique: false},
  description: { type: String, required: false, unique: false},
  warnings: { type: String, required: false, unique: false},
  interactions: { type: String, required: false, unique: false},
  directions: { type: String, required: false, unique: false},
  picture: { type: String, required: false, unique: false}
});

userSchema.pre('save', function(next){
// TODO - Add ability to switch betwen MD5 & BCrypt for password storage

  var user = this;

	if(!user.isModified('password')) return next();

// usage of md5 for password storage
// TODO - Add MD5 storage
// TODO - Add Error Handling
//user.password = crypto.MD5(user.password).toString();
//next();
// catch (ex)
// next(ex);

// usage of bcrypt for password storage
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

var Med = mongoose.model('Med', medSchema);
var User = mongoose.model('User', userSchema);

exports.med = Med;
exports.user = User;
exports.db = db;