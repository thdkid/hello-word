var mongoose = require('mongoose');
var artistSchema = mongoose.Schema({
  name: String
});
var Artists = module.exports = mongoose.model('Artists',artistSchema);
