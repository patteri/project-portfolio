var express = require('express');
var router = express.Router();
var staticModels = require('../models/static');

router.get('/api/links', function(req, res) {
    res.json(staticModels.links);
});

module.exports = router;