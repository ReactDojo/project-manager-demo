var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Task = new Schema({
    _projectID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    startdate: { 
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Task', Task);