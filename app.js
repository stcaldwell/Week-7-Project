const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.Promise = require('bluebird');
// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/stattrackdb');
var db = mongoose.connection;

const Activity = require('./models/activities');
const User = require('./models/user');

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ name: username }, function(err, user){
      if (user && bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }
      return done(null, false);
    });
  }
));

app.get('/api/auth',
  passport.authenticate('basic', {session: false}), function (req, res) {
      res.send('You seem to check out, ' + req.user.name);
  }
);

app.get('/', function(req, res){
  res.send('Please use /api/activities');
});

app.get('/api/activities', passport.authenticate('basic', {session: false}), function(req, res){
  Activity.getActivities(function(err, activities){
    if(err){
      throw err;
    }
    res.json(activities);
  });
});

app.get('/api/activities/:_id', passport.authenticate('basic', {session: false}), function(req, res){
  Activity.getActivityById(req.params._id, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

app.post('/api/activities', passport.authenticate('basic', {session: false}), function(req, res){
  var activity = req.body;
  Activity.addActivity(activity, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

app.put('/api/activities/:id', passport.authenticate('basic', {session: false}), function(req, res){
  var id = req.params._id;
  var activity = req.body;
  Activity.updateActivity(id, activity, {}, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

app.delete('/api/activities/:_id', passport.authenticate('basic', {session: false}), function(req, res){
  var id = req.params._id;
  Activity.removeActivity(id, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});


app.get('/api/activities/stat/:stat', passport.authenticate('basic', {session: false}), function(req, res){
  Activity.getActivityByStat(req.params.stat, function(err, activity){
    if(err){
      throw err;
    }
    res.json(activity);
  });
});

app.listen(27017, function(req, res){
  console.log("Dont get cocky kid")
});
