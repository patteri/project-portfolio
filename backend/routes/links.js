var express = require('express');
var router = express.Router();

router.get('/api/links', function(req, res) {
    var collection = req.db.get('links');
    collection.find({}, {}, function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.post('/api/admin/links', function (req, res) {
    var collection = req.db.get('links');
    collection.insert(req.body, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.put('/api/admin/links/:id', function (req, res) {
    var collection = req.db.get('links');
    collection.updateById(req.params.id, req.body, function (err, data) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

router.delete('/api/admin/links/:id', function (req, res) {
    var collection = req.db.get('links');
    collection.remove({_id: req.params.id}, function (err) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

module.exports = router;