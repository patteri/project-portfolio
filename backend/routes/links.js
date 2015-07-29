var express = require('express');
var router = express.Router();

router.get('/api/links', function(req, res) {
    var db = req.db;
    var collection = db.get('links');
    collection.find({}, {}, function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

module.exports = router;