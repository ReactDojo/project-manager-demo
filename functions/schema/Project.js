var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Project = new Schema({
    title: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: { 
        type: Date,
        required: true
    },
    rateofpay: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Project', Project);