var express = require('express');
var router = express.Router();

var File = require('../models/file.js');

router.get('/api/files', function(req, res) {
    File.find(function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.post('/api/admin/files', function (req, res) {
    var file = new File(req.body);
    file.save(function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.put('/api/admin/files/:id', function (req, res) {
    File.update({_id: req.params.id}, req.body, {}, function (err) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

router.delete('/api/admin/files/:id', function (req, res) {
    File.remove({_id: req.params.id}, function (err) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

module.exports = router;