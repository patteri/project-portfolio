var express = require('express');
var router = express.Router();
var auth = require('../authentication/authentication');

router.post('/api/login', function(req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    auth.validate(req.db, username, password).then(function (user) {
        if (!user || user.length == 0) {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
        }
        else {
            res.json(auth.genToken(user[0]));
        }
    });
});

module.exports = router;