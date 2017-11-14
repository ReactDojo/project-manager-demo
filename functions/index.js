// Import bodyParser library 
const bodyParser = require('body-parser');
// Import Firebase Functions Library
const functions = require('firebase-functions');
// Import Express Server Library and initialize
const express = require('express');
const app = express();

// Apply bodyParser middleware to parse incoming JSON data to req.body
app.use(bodyParser.urlencoded({ extended: true }))
   .use(bodyParser.json());

// Apply Access Headers to all requests (enable CORS)
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// Use Express Router
app.use('/', require('./routes/api'));

// Export functions as app to Firebase
exports.app = functions.https.onRequest(app);