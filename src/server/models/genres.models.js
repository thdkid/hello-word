var mongoose = require('mongoose');
var genreSchema = mongoose.Schema({
  name: String
});
var Genres = module.exports = mongoose.model('Genres',genreSchema);
