'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var moment = require('moment');

const JWT_SECRET = process.env.JWT_SECRET;

var User;

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    profilePicture: {
        type: String
    },
    displayName: {
        type: String
    },
    facebook: {
        type: String
    }
});

userSchema.statics.authMiddleware = function(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).send({
            message: 'Please make sure your request has an Authorization header'
        });
    }
    var token = req.header('Authorization').split(' ')[1];

    console.log('tokennnn: ', token);

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) return res.status(401).send({
            error: 'Must be authenticated.'
        });

        User
            .findById(payload._id)
            .exec((err, user) => {
                if (err || !user) {
                    // var token = localStorage.satellizer_token;
                    return res.status(400).send(err || {
                        error: 'User not found.'
                    });
                }

                req.user = user;
                next();
            })
    });
};

userSchema.methods.generateToken = function() {
    var payload = {
        _id: this._id,
        iat: Date.now(),
        exp: moment().add(1, 'day').unix()
    };
    var token = jwt.sign(payload, JWT_SECRET);
    return token;
};

userSchema.statics.authenticate = function(userObj, cb) {
    User.findOne({
        username: userObj.username
    }, function(err, user) {
        if (err || !user) {
            return cb("Authentication failed.");
        }
        bcrypt.compare(userObj.password, user.password, function(err, isGood) {
            if (err || !isGood) {
                return cb("Authentication failed.");
            }
            user.password = null;
            cb(null, user);
        });
    });
};

userSchema.statics.register = function(userObj, cb) {
    console.log('userObj:', userObj);
    User.findOne({
        email: userObj.email
    }, (err, dbUser) => {
        console.log(err, dbUser);
        if (err || dbUser) return cb(err || {
            error: 'Email not available.'
        })

        bcrypt.hash(userObj.password, 12, (err, hash) => {
            if (err) return cb(err);

            var user = new User({
                email: userObj.email,
                password: hash
            });

            user.save(cb);
        });
    });
};

User = mongoose.model('User', userSchema);
module.exports = User;
