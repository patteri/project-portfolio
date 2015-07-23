var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

var PublicFilePath = "./frontend/_public/frontend";

http.createServer(function (req, res) {
    var filePath = false;

    if (req.url == '/') {
        filePath = PublicFilePath + "/index.html";
    }
    else {
        filePath = PublicFilePath + req.url;
    }
    serveStatic(res, cache, filePath);
}).listen(3000, function () {
    console.log("Server started in port 3000.");
});

function serveStatic(res, cache, absPath) {
    if (cache[absPath]) {
        sendFile(res, absPath, cache[absPath]);
    }
    else {
        fs.exists(absPath, function (exists) {
            if (exists) {
                fs.readFile(absPath, function (err, data) {
                    if (err) {
                        send404(res);
                    }
                    else {
                        cache[absPath] = data;
                        sendFile(res, absPath, data);
                    }
                });
            }
            else {
                send404(res);
            }
        });
    }
}

function sendFile (res, filePath, fileContents) {
    res.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
    res.end(fileContents);
}

function send404 (res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('Error 404: resource not found.');
    res.end();
}