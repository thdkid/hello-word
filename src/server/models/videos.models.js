var mongoose = require('mongoose');

// Genre Schema
var videoSchema = mongoose.Schema({
    name: String,
    singer: String,
    genre: String,
    artist: String,
    update: String,
    img: String,
    url: String,
    plays: String,
    detail: String
  });

var Videos = module.exports = mongoose.model('Videos', videoSchema);
