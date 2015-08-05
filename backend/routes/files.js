var express = require('express');
var router = express.Router();

router.get('/api/files', function(req, res) {
    var collection = req.db.get('files');
    collection.find({}, {}, function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.post('/api/admin/files', function (req, res) {
    var collection = req.db.get('files');
    collection.insert(req.body, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.put('/api/admin/files/:id', function (req, res) {
    var collection = req.db.get('files');
    collection.updateById(req.params.id, req.body, function (err, data) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

router.delete('/api/admin/files/:id', function (req, res) {
    var collection = req.db.get('files');
    collection.remove({_id: req.params.id}, function (err) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

module.exports = router;