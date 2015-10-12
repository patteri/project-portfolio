var mongoose = require('mongoose');

var fileSchema = mongoose.Schema({
    name: String,
    filename: String
});

module.exports = mongoose.model('File', fileSchema);