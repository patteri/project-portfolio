var express = require('express');
var router = express.Router();

router.get('/api/projects', function(req, res) {
    var db = req.db;
    var collection = db.get('projects');
    collection.find({}, {}, function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.post('/api/admin/projects', function (req, res) {
    // TODO
    res.json({"message": "TODO: add project"});
});

module.exports = router;