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
