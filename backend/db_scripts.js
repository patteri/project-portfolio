// Run this script to store records in initial data into MongoDB

var crypto = require('crypto');
var _ = require('lodash');
var mongoose = require('mongoose');
var config = require('./config.js');
mongoose.connect(config.mongoDbAddress);

var User = require('./models/user.js');
var File = require('./models/file.js');
var Link = require('./models/link.js');
var Project = require('./models/project.js');
var initialData = require('./models/initial_data.js');

_.each(initialData.users, function (item) {
    item.password = crypto.createHash('sha256').update(item.password).digest('hex');
    var user = new User(item);
    user.save(function (err, user) {
        if (err) {
            console.log("Error when saving user:", err);
        }
    });
});

_.each(initialData.files, function (item) {
    var file = new File(item);
    file.save(function (err, file) {
        if (err) {
            console.log("Error when saving file:", err);
        }
    });
});

_.each(initialData.links, function (item) {
    var link = new Link(item);
    link.save(function (err, link) {
        if (err) {
            console.log("Error when saving link:", err);
        }
    });
});

_.each(initialData.projects, function (item) {
    var project = new Project(item);
    project.save(function (err, project) {
        if (err) {
            console.log("Error when saving project:", err);
        }
    });
});