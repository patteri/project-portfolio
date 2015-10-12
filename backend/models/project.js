var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    name: { type: String, required: true },
    startTime: Date,
    endTime: Date,
    type: String,
    shortDescription: String,
    description: String,
    tags: [String],
    link: {
        name: String,
        url: String
    },
    images: [String]
});

module.exports = mongoose.model('Project', projectSchema);