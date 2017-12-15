var mongoose = require('mongoose');

// Genre Schema
var genreSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  createDate: {
    type: Date,
    default: Date.now
  }
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);

// get Genres
module.exports.getGenres = function (callback, limit) {
  Genre.find(callback).limit(limit);
};

//add genre
module.exports.addGenre = function (genre, callback) {
  Genre.create(genre, callback);
};

//update genre
module.exports.updateGenre = function (id, genre, update, options, callback) {
  var query = { _id: id };
  var updateDB = {
    name: genre.name
  };
  Genre.findOneAndUpdate(query, updateDB, options, callback);
};

//remove genre
module.exports.removeGenre = function (id, callback) {
  var query = { _id: id };
  Genre.remove(query, callback);
};
