// Import path library
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

// Initialize Express Router
const Router = express.Router();

// Return JSON of all project data from db
Router.get('/projects', function (req, res) {
  Project.find({}).exec(function (err, project) {
    if (err) return res.send(err);
    return res.send(project);
  });
});

// Return JSON of product data by :id
Router.get('/project/:id', function (req, res) {
  Project.find({ "_id": req.params.id }).exec(function (err, project) {
    if (err) return res.send(err);
    return res.send(project);
  });
});

// Performs a POST of new project data and returns a success, or error message in JSON
Router.post('/project/new', function (req, res) {
  let New = new Project({ name: req.body.project_name, description: req.body.project_description });
  New.save(function (err) {
    if (err) {
      res.json({ message: err });
    } else {
      res.json({ message: 'Successful!' });
    }
  })
});

Router.get('/project/:pid/tasks/', function (req, res) {

});

Router.post('/project/:pid/task/new', function (req, res) {

});

module.exports = Router;