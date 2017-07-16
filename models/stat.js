var mongoose =  require('mongoose');
const bcrypt = require('bcryptjs');

var statSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  activityId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }

});

const Stat = mongoose.model('Stat', statSchema);
modeule.exports = Stat;
