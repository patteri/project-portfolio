var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var files = require('./routes/files');
var links = require('./routes/links');
var projects = require('./routes/projects');
var login = require('./routes/login');
var auth = require('./authentication/authentication');

var PublicFilePath = "/../frontend/_public/frontend";

var app = express();

mongoose.connect('mongodb://localhost/project-portfolio');

// Configure app
app.set('port', 3000);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + PublicFilePath)));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// Authentication required for admin APIs
app.use('/api/admin', auth.authenticate);

// Routes
app.use(files);
app.use(links);
app.use(projects);
app.use(login);

// Error handling
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    var status = err.status || 500;
    res.status(status).json({
        status: status,
        error: err.message
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;