var mongoose = require('mongoose');

// Genre Schema
var albumSchema = mongoose.Schema({
    nameGenre: String,
    img: String
  });

var Albums = module.exports = mongoose.model('Albums', albumSchema);
