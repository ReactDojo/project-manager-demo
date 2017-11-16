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
  },
  {
    id: 'mode',
    title: 'Language',
    options: ['javascript', 'xml', 'markdown', 'php', 'python', 'ruby'],
    value: 'javascript'
  },
  {
    id: 'theme',
    title: 'Select themes',
    options: [
      'default',
      'zenburn',
      'solarized',
      'rubyblue',
      'paraiso-dark',
      'midnight',
      'material',
      'hopscotch',
      'twilight'
    ],
    value: 'zenburn'
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
  exports.app = functions.https.onRequest(app);`
};

export { switchOptions, selectOptions, defaultValues };
