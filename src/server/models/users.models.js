var mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
    userID: String,
    authority: String
  });

var Users = module.exports = mongoose.model('Users', userSchema);
