const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');


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

app.listen(27017, function(req, res){
  console.log("Dont get cocky kid")
});
