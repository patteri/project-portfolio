// Run this script to store records in static models into MongoDB

var mongodb = require('mongodb');

var server = new mongodb.Server('127.0.0.1', 27017, {});
var client = new mongodb.Db('project-portfolio', server, {w: 1});

var staticModels = require('./models/static');

client.open(function (err) {
    if (err) throw err;

    client.collection('files', function (err, collection) {
        if (err) throw err;

        collection.insert(staticModels.files);
    });

    client.collection('links', function (err, collection) {
        if (err) throw err;

        collection.insert(staticModels.links);
    });

    client.collection('projects', function (err, collection) {
        if (err) throw err;

        collection.insert(staticModels.projects);
    });
});