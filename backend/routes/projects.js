var express = require('express');
var router = express.Router();
var staticModels = require('../models/static');

router.get('/api/projects', function(req, res) {
    res.json(staticModels.projects);
});

module.exports = router;