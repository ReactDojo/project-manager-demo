var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Project = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startdate: { type: Date },
    enddate: { type: Date }
});

module.exports = mongoose.model('Project', Project);