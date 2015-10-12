var express = require('express');
var router = express.Router();
var multer  = require('multer');

var Project = require('../models/project.js');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'frontend/_public/frontend/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({storage: storage});

router.get('/api/projects', function(req, res) {
    Project.find(function(err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.post('/api/admin/projects', function (req, res) {
    var project = new Project(req.body);
    project.save(function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

router.put('/api/admin/projects/:id', function (req, res) {
    Project.update({_id: req.params.id}, req.body, {}, function (err) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

router.delete('/api/admin/projects/:id', function (req, res) {
    Project.remove({_id: req.params.id}, function (err) {
        if (err) throw err;
        res.json({"message": "ok"});
    });
});

router.post('/api/admin/projects/image', upload.single('file'), function (req, res) {
    res.json({"file": req.file.originalname});
});

module.exports = router;