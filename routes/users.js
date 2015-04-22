var mongo = require('mongodb');
var mongoose = require('mongoose');
var crypto = require('crypto-js');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var util = require('util');
var config = require(process.env.MED_CONF);
var SALT_WORK_FACTOR = 1;


var accessLogStream = fs.createWriteStream(config.accessLog, {
    flags: 'a'
});

console.log = function(d) {
    accessLogStream.write(util.format(d) + '\n');
};

mongoose.connect('localhost', 'meddb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Connected to Users');
});

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    hashDigest: {
        type: String,
        required: true
    },
    workFactor: {
        type: Number,
        required: false
    },
    role:{
        type: String,
        required: true,
        unique: true
    }
});

userSchema.pre('save', function(next) {

    var user = this;

    if (!user.isModified('password')) return next();

    if (config.hashDigest.toLowerCase() === 'md5') {
        try {
            user.password = crypto.MD5(user.password).toString();
            next();
        } catch (ex) {
            next(ex);
        }
    }

    if (config.hashDigest.toLowerCase() === 'bcrypt') {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {

    console.log('comparePassword() - candidatePassword:' + candidatePassword);

    if (config.hashDigest.toLowerCase() === 'md5') {
        var candidateHash = crypto.MD5(candidatePassword).toString();

        if (candidateHash === this.password) {
            cb(null, true);
        } else {
            cb(null);
        }
    }

    if (config.hashDigest.toLowerCase() === 'bcrypt') {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    }
};

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

var User = mongoose.model('User', userSchema);

passport.use(new LocalStrategy(function(username, password, done) {
    console.log('login() - username:' + username);
    if (config.hashDigest.toLowerCase() === 'md5') {
    User.findOne({
        username: username, password: crypto.MD5(password).toString()
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Unknown user ' + username
            });
        }
        return done(null,user);
    });
    }
    if (config.hashDigest.toLowerCase() === 'bcrypt') {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
    }
    else {
    User.findOne({
        username: username, password: password
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Unknown user ' + username
            });
        }
        return done(null,user);
    });
    }
}));


exports.findAll = function(req, res) {
    res.send({
        user: req.user
    });
};

exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.session.messages = [info.message];
            return res.redirect('/#login');
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/#meds');
        });
    })(req, res, next);
};

exports.register = function(req, res, next) {
    var user = new User();
    user.username = req.param('username');
    user.password = req.param('password');
    if (config.hashDigest.toLowerCase() === 'bcrypt') {
        user.hashDigest = 'bcrypt';
    }
    if (config.hashDigest.toLowerCase() === 'md5') {
        user.hashDigest = 'md5';
    }
    user.email = req.param('email');
    user.role = req.param('role');
    console.log(user);
    user.save(function(err) {
        if (err) {
            console.log('Error in Saving user: ' + err);
            return res.redirect('/#register');

        }
        console.log('User Registration succesful');
        return res.redirect('/#login');
    });
};

exports.ensureAuth = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/#login');
};