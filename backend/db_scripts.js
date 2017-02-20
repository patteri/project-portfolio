// Run this script to store records in initial data into MongoDB

var crypto = require('crypto');
var _ = require('lodash');
var mongoose = require('mongoose');
var prompt = require('prompt');
var config = require('./config.js');
mongoose.connect(config.mongoDbAddress);

var User = require('./models/user.js');
var File = require('./models/file.js');
var Link = require('./models/link.js');
var Project = require('./models/project.js');
var initialData = require('./models/initial_data.js');

// Prompt for confirmation
console.log("This script initializes database '" +
    config.mongoDbAddress +
    "'. All existing data will be lost. If you want to continue, type 'yes'.");
prompt.start();

prompt.get(['answer'], function (err, result) {
    if (!err && result.answer === 'yes') {
        init();
    }
    else {
        process.exit();
    }
});

function init () {
    console.log("Starting to initialize the database...");
    saveUsers();
}

function saveUsers () {
    User.remove(function() {
        var users = _.map(initialData.users, function (item) {
            item.password = crypto.createHash('sha256').update(item.password).digest('hex');
            return item;
        });

        User.insertMany(users)
            .then(function () {
                console.log('Users saved successfully');
                saveFiles();
            })
            .catch(function (err) {
                console.log("Error when saving users:", err);
                process.exit(1);
            });
    });
}

function saveFiles () {
    File.remove(function() {
        File.insertMany(initialData.files)
            .then(function () {
                console.log('Files saved successfully');
                saveLinks();
            })
            .catch(function (err) {
                console.log("Error when saving files:", err);
                process.exit(1);
            });
    });
}

function saveLinks () {
    Link.remove(function() {
        Link.insertMany(initialData.links)
            .then(function () {
                console.log('Links saved successfully');
                saveProjects();
            })
            .catch(function (err) {
                console.log("Error when saving links:", err);
                process.exit(1);
            });
    });
}

function saveProjects () {
    Project.remove(function() {
        Project.insertMany(initialData.projects)
            .then(function () {
                console.log('Projects saved successfully');
                success();
            })
            .catch(function (err) {
                console.log("Error when saving projects:", err);
                process.exit(1);
            });
    });
}

function success () {
    console.log("The database was initialized successfully!");
    process.exit();
}