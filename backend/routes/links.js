var express = require('express');
var router = express.Router();

var Link = require('../models/link.js');

router.get('/api/links', function(req, res) {
    Link.find(function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.post('/api/admin/links', function (req, res) {
    var link = new Link(req.body);
    link.save(req.body, function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.put('/api/admin/links/:id', function (req, res) {
    Link.update({_id: req.params.id}, req.body, {}, function (err) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

router.delete('/api/admin/links/:id', function (req, res) {
    Link.remove({_id: req.params.id}, function (err) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

module.exports = router;