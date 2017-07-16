var mongoose =  require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: String,
  password: String
});

userSchema.pre('save', function(next){

  var hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;
