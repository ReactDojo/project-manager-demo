const switchOptions = [
  {
    id: 'lineNumbers',
    title: 'Line Numbers',
    trueValue: true,
    falseValue: false,
    value: true
  },
  {
    id: 'readOnly',
    title: 'Read Only',
    trueValue: false,
    falseValue: true,
    value: true
  }
];
const selectOptions = [
  {
    id: 'tabSize',
    title: 'Tab Size',
    options: ['2', '4', '6', '8'],
    value: 2
  }
];

const defaultValues = {
  basic: `// Import bodyParser library 
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
  exports.app = functions.https.onRequest(app);`,
  routing: `// Import path library
  const path = require('path');
  
  // Import .env variables
  require('dotenv').config({
    path: path.join(__dirname, '../.env')
  });
  
  // Import Express library
  const express = require('express');
  // Import MongoDB library
  const MongoDB = require('mongodb');
  // Import Mongoose ODM library
  const mongoose = require('mongoose');
  // Connect to MongoDB via Mongoose
  mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
  // Configure Mongoose to inherit from global Promise 
  mongoose.Promise = global.Promise;
  // Set debug flag true / false to toggle console logs
  mongoose.set('debug', true);
  // Assign the Mongoose connection resource
  const db = mongoose.connection;
  
  // Import Schema files
  const Project = require('../schema/Project');
  const Task = require('../schema/Task');
  const User = require('../schema/User');
  
  // Initialize Express Router
  const Router = express.Router();`
};

export { switchOptions, selectOptions, defaultValues };
