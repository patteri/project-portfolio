var http = require('http');
var express = require('express');
var path = require('path');
var db = require('monk')('localhost/project-portfolio')
var files = require('./routes/files');
var links = require('./routes/links');
var projects = require('./routes/projects');

var PublicFilePath = "/../frontend/_public/frontend";

var app = express();

// Configure app
app.set('port', 3000);
app.use(express.static(path.join(__dirname + PublicFilePath)));

// Make db accessible in routers
app.use(function(req, res, next){
    req.db = db;
    next();
});

// Routes
app.use(files);
app.use(links);
app.use(projects);

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