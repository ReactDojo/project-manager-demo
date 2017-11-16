var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Task = new Schema({
    task: {
        type: String,
        required: true
    },
    createTime: { 
        type: Date,
        default: Date.now
    },
    color: { 
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', Task);