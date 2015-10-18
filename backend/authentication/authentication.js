var jwt = require('jwt-simple');
var crypto = require('crypto');
var config = require('../config.js');
var _ = require('lodash');

var User = require('../models/user.js');

var auth = {
    authenticate: function (req, res, next) {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

        if (token) {
            try {
                var decoded = jwt.decode(token, config.jwtSecret);

                if (decoded.exp <= Date.now()) {
                    res.status(400);
                    res.json({
                        "status": 400,
                        "message": "Token Expired"
                    });
                    return;
                }

                User.findOne({username: decoded.user.username}, function (err, user) {
                    if (!err && user) {
                        next();
                    } else {
                        res.status(401);
                        res.json({
                            "status": 401,
                            "message": "Invalid User"
                        });
                    }
                });
            } catch (err) {
                throw err;
            }
        } else {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Unauthorized user"
            });
        }
    },

    validate: function(username, password) {
        var encrypted = crypto.createHash('sha256').update(password).digest('hex');
        return User.findOne({username: username, password: encrypted}, function (err) {
            if (err) {
                console.log(err);
            }
        });
    },

    genToken: function (user) {
        var expires = expiresIn(config.tokenExpires);
        var secureUser = userToSecureJson(user);
        var token = jwt.encode({
            exp: expires,
            user: secureUser
        }, config.jwtSecret);

        return {
            token: token,
            expires: expires,
            user: secureUser
        };
    }
}

function expiresIn(daysCount) {
    var date = new Date();
    return date.setDate(date.getDate() + daysCount);
}

function userToSecureJson(user) {
    return _.pick(user, "username");
}

module.exports = auth;