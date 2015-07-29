var express = require('express');
var router = express.Router();

router.get('/api/files', function(req, res) {
    var db = req.db;
    var collection = db.get('files');
    collection.find({}, {}, function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

module.exports = router;