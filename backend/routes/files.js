var express = require('express');
var router = express.Router();
var staticModels = require('../models/static');

router.get('/api/files', function(req, res) {
    res.json(staticModels.files);
});

module.exports = router;