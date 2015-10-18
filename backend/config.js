// Application parameters

var config = {};

config.port = 3000;
config.mongoDbAddress = "mongodb://localhost/project-portfolio";

config.jwtSecret = "this_is_secret"; // JWT token secret
config.tokenExpires = 5; // JWT token expiration time in days

module.exports = config;