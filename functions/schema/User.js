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
    avatar: {
        type: String
    },
    mobile: { 
        type: String,
    },
    home: { 
        type: String,
    },
    company: { 
        type: String,
    },
    work: { 
        type: String,
    },
    note: { 
        type: String,
    }
});

module.exports = mongoose.model('User', User);