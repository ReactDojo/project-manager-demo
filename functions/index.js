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

// Use Express Router
app.use('/', require('./routes/api'));

// Export functions as app to Firebase
exports.app = functions.https.onRequest(app);