var mongoose = require('mongoose');

// Genre Schema
var songSchema = mongoose.Schema({
    name: String,
    singer: String,
    genre: String,
    artist: String,
    update: Date,
    modified: Date,
    img: String,
    url: String,
    plays: Number,
    lyrics: String,
    country: String,
  });

var Songs = module.exports = mongoose.model('Songs', songSchema);
