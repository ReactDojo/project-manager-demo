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
const User = require('../schema/User');

// Initialize Express Router
const Router = express.Router();

/*
 *  Routing for /projects
 */

// Return JSON of all project data from db
Router.get('/projects', function (req, res) {
  Project.find({}).exec(function (err, project) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error obtaining projects data from API!',
        description: err
      }
      return res.status(500).json(message);
    } else {
      return res.status(200).json(project);
    }
  });
});

// Performs a POST of new project data and returns a success, or error message in JSON
Router.post('/projects', function (req, res) {
  let New = new Project({
    title: req.body.title,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    rateofpay: req.body.rateofpay,
    status: req.body.status,
    notes: req.body.notes,
    avatar: req.body.avatar
  });
  New.save(function (err) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error obtaining project data from API!',
        description: err
      }
      res.status(500).json(message);
    } else {
      let message = {
        success: true,
        type: 'success',
        message: 'Successfully created new project!',
        description: ''
      }
      res.status(200).json(message);
    }
  })
});

// Return JSON of product data by :id
Router.get('/project/:id', function (req, res) {
  Project.find({ "_id": req.params.id }).exec(function (err, project) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error obtaining project data from API!',
        description: err
      }
      return res.status(500).json(message);
    } else {
      return res.status(200).json(project);
    }
  });
});

Router.put('/project/:id', function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error locating project data!',
        description: err
      }
      res.status(500).json(message);
    } else {
      project.title = req.body.title || project.title;
      project.avatar = req.body.avatar || project.avatar;
      project.startdate = req.body.startdate || project.startdate;
      project.enddate = req.body.enddate || project.enddate;
      project.rateofpay = req.body.rateofpay || project.rateofpay;
      project.status = req.body.status || project.status;
      project.notes = req.body.notes || project.notes;
      project.save((err, project) => {
        if (err) {
          let message = {
            success: false,
            type: 'error',
            message: 'Error saving project data!',
            description: err
          }
          res.status(500).json(message)
        } else {
          let message = {
            success: true,
            type: 'success',
            message: 'Successfully updated project data!',
            description: ''
          }
          res.status(200).json(message);
        }
      });
    }
  });
});

Router.delete('/project/:id', function (req, res) {
  Project.findByIdAndRemove(req.params.id, function (err, project) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error deleting project data!',
        description: err
      }
      res.status(500).json(message);
    } else {
      let message = {
        success: true,
        type: 'success',
        message: 'Project successfully deleted!',
        description: ''
      }
      res.status(200).json(message);
    }
  })
});

/*
 *  Routing for /users
 */

Router.get('/users', function (req, res) {
  User.find({}).exec(function (err, users) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error getting data for users!',
        description: err
      }
      return res.status(500).json(message);
    } else {
      return res.status(200).json(users);
    }
  });
});

Router.post('/users', function (req, res) {
  let New = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    name: req.body.name,
    avatar: req.body.avatar,
    mobile: req.body.mobile,
    home: req.body.home,
    company: req.body.company,
    work: req.body.work,
    note: req.body.note
  });
  New.save(function (err) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error saving new user!',
        description: err
      }
      res.status(500).json(message);
    } else {
      let message = {
        success: true,
        type: 'success',
        message: 'Successfully added new user!',
        description: ''
      }
      res.status(200).json(message);
    }
  })
});

Router.get('/user/:id', function (req, res) {
  User.find({ "_id": req.params.id }).exec(function (err, user) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error obtaining user data from API!',
        description: err
      }
      return res.status(500).json(message);
    } else {
      return res.status(200).json(user);
    }
  });
});

Router.put('/user/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error locating user data!',
        description: err
      }
      res.status(500).json(message);
    } else {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.name = req.body.name || user.name;
      user.avatar = req.body.avatar || user.avatar;
      user.mobile = req.body.mobile || user.mobile;
      user.home = req.body.home || user.home;
      user.company = req.body.company || user.company;
      user.work = req.body.work || user.work;
      user.note = req.body.note || user.note;
      user.save((err, user) => {
        if (err) {
          let message = {
            success: false,
            type: 'error',
            message: 'Error saving user data!',
            description: err
          }
          res.status(500).json(message)
        } else {
          let message = {
            success: true,
            type: 'success',
            message: 'Successfully updated user data!',
            description: ''
          }
          res.status(200).json(message);
        }
      });
    }
  });
});

Router.delete('/user/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error deleting user data!',
        description: err
      }
      res.status(500).json(message);
    } else {
      let message = {
        success: true,
        type: 'success',
        message: 'User successfully deleted!',
        description: ''
      }
      res.status(200).json(message);
    }
  })
});

/*
 *  Routing for /tasks
 */

Router.get('/tasks', function (req, res) {
  Task.find({}).exec(function (err, tasks) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error obtaining tasks from API!',
        description: err
      }
      return res.status(500).json(message);
    } else {
      return res.status(200).json(tasks);
    }
  });
});

Router.post('/tasks', function (req, res) {
  let New = new Task({ task: req.body.task });
  New.save(function (err) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error adding new task!',
        description: err
      }
      res.status(500).json(message);
    } else {
      let message = {
        success: true,
        type: 'success',
        message: 'Successfully added new task!',
        description: ''
      }
      res.status(200).json(message);
    }
  })
});

Router.put('/task/:id', function (req, res) {
  Task.findById(req.params.id, function (err, task) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error locating task!',
        description: err
      }
      res.status(500).json(message);
    } else {
      task.task = req.body.task || task.task;
      task.createTime = req.body.createTime || task.createTime;
      task.color = req.body.color || task.color;
      task.completed = req.body.completed || task.completed;
      task.save((err, task) => {
        if (err) {
          message = {
            success: false,
            type: 'error',
            message: 'Error updating task!',
            description: err
          }
          res.status(500).json(message);
        } else {
          let message = {
            success: true,
            type: 'success',
            message: 'Successfully updated task!',
            description: ''
          }
          res.status(200).json(message);
        }
      });
    }
  });
});

Router.delete('/task/:id', function (req, res) {
  Task.findByIdAndRemove(req.params.id, function (err, task) {
    if (err) {
      let message = {
        success: false,
        type: 'error',
        message: 'Error deleting task!',
        description: err
      }
      res.status(500).json(message);
    } else {
      let message = {
        success: true,
        type: 'success',
        message: 'Task successfully deleted!',
        description: ''
      }
      res.status(200).json(message);
    }
  });
});

module.exports = Router;