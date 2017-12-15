var Genre = require('./../models/genres.models');

module.exports = {
  getGenre:getGenre,
  addGenre: addGenre,
  updateGenre:updateGenre,
  deleteGenre: deleteGenre
};

function getGenre(request) {
  return new Promise((resolve, reject) => {
    Genre.find({}).limit(request.limit).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function addGenre(request) {
  return new Promise((resolve, reject) => {
    var newGenre = new Genre({
      name: request.name,
      update: Date.now()
      // artist: request.artist,

    });
    newGenre.save(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function updateGenre(request) {
  return new Promise((resolve,reject)=> {
    var update = {
      name: request.name,
      modified: Date.now()
      // artist: request.artist

    };
    Genre.findOneAndUpdate({
      _id:request.id
    },update,{new:true}).exec(function(err,res) {
      if (err) {
        reject(err);
      }
      else {
        resolve({
          message: 'Update OK'
        });
      }
    });
  });
}

function deleteGenre(request) {
  return new Promise((resolve, reject) => {
    Genre.findOneAndRemove({
      _id:request.id
    }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve({
          message: 'Delete OK'
        });
      }
    });
  });
}
