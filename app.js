const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/stattrackdb');
var db = mongoose.connection;

Activity = require('./models/activities');

app.get('/', function(req, res){
  res.send('Please use /api/activities');
});

app.get('/api/activities', function(req, res){
  Activity.getActivities(function(err, activities){
    if(err){
      throw err;
    }
    res.json(activities);
  });
});

app.get('/api/activities/:_id', function(req, res){
  Activity.getActivitiesById(req.params._id, function(err, activities){
    if(err){
      throw err;
    }
    res.json(activities);
  });
});

app.post('/api/activities', function(req, res){
  var activity = req.body;
  Activity.addActivity(activity, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

app.put('/api/activities/:id', function(req, res){
  var id = req.params._id;
  var activity = req.body;
  Activity.updateActivity(id, activity, {}, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

app.delete('/api/activities/:_id', function(req, res){
  var id = req.params._id;
  Activity.removeActivity(id, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

app.listen(27017, function(req, res){
  console.log("Dont get cocky kid")
});
