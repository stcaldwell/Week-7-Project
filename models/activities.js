var mongoose =  require('mongoose');

// Activity Schema
var activitiesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  metric: {
    type: String,
    required: true,
  },
  metric_amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true
  }

});

var Activity = module.exports = mongoose.model('Activity', activitiesSchema)

module.exports.getActivities = function(callback, limit){
  Activity.find(callback).limit(limit);
}

module.exports.getActivitiesById = function(id, callback){
  Activity.findById(id, callback);
}

// add Activity
module.exports.addActivity = function(activity, callback){
  Activity.create(activity, callback);
}

module.exports.updateActivity = function(activity, callback){
  var query = {_id: id};
  var update = {
    name: activity.name,
    metric: activity.metric,
    metric_amount: activity.metric_value,
    date: activity.date
  }
  Activity.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeActivity = function(id, callback){
  var query = {_id: id};
  Activity.remove(query, callback);
}
