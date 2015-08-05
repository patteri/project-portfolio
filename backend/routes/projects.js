var express = require('express');
var router = express.Router();

router.get('/api/projects', function(req, res) {
    var collection = req.db.get('projects');
    collection.find({}, {}, function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.post('/api/admin/projects', function (req, res) {
    var collection = req.db.get('projects');
    collection.insert(req.body, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.put('/api/admin/projects/:id', function (req, res) {
    var collection = req.db.get('projects');
    collection.updateById(req.params.id, req.body, function (err, data) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

router.delete('/api/admin/projects/:id', function (req, res) {
    var collection = req.db.get('projects');
    collection.remove({_id: req.params.id}, function (err) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

module.exports = router;