var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: { 
        type: String,
        required: true
    },
    home: { 
        type: String,
        required: true
    },
    company: { 
        type: String,
        required: true
    },
    work: { 
        type: String,
        required: true
    },
    note: { 
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', User);