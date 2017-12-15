var mongoose = require('mongoose');

// Genre Schema
var playlistSchema = mongoose.Schema({
    userID: String,
    name: String,
    plays: Number,
    update: Date,
    listsong: Array
  });

var Playlists = module.exports = mongoose.model('Playlists', playlistSchema);
