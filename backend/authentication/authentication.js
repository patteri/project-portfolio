var jwt = require('jwt-simple');
var _ = require('lodash');

var auth = {
    authenticate: function (req, res, next) {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

        if (token) {
            try {
                var decoded = jwt.decode(token, "secret"); // TODO: put secret into config file

                if (decoded.exp <= Date.now()) {
                    res.status(400);
                    res.json({
                        "status": 400,
                        "message": "Token Expired"
                    });
                    return;
                }

                validateUser(req.db, decoded.user.username).then(function (user) {
                    if (user && user.length > 0) {
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

    validate: function(db, username, password) {
        var collection = db.get('users');
        return collection.find({username: username, password: password}, {});
    },

    genToken: function (user) {
        var expires = expiresIn(7); // 7 days
        var secureUser = userToSecureJson(user);
        var token = jwt.encode({
            exp: expires,
            user: secureUser
        }, "secret"); // TODO: put secret into config file

        return {
            token: token,
            expires: expires,
            user: secureUser
        };
    }
}

function validateUser(db, username) {
    var collection = db.get('users');
    return collection.find({username: username}, {});
}

function expiresIn(daysCount) {
    var date = new Date();
    return date.setDate(date.getDate() + daysCount);
}

function userToSecureJson(user) {
    return _.pick(user, "username");
}

module.exports = auth;