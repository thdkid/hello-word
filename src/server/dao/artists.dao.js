var Artist = require('./../models/artists.model');

module.exports = {
  getArtist: getArtist,
  searchArtist: searchArtist,
  addArtist: addArtist,
  updateArtist:updateArtist,
  deleteArtist: deleteArtist
};

function getArtist(request) {
  return new Promise((resolve, reject) => {
    Artist.find({}).limit(request.limit).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function searchArtist(request) {
  return new Promise((resolve, reject) => {
    Artist.find({ name: { '$regex': request.name, '$options': 'i' } }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function addArtist(request) {
  return new Promise((resolve, reject) => {
    var newArtist = new Artist({
      name: request.name,
      update: Date.now()
      // artist: request.artist,

    });
    newArtist.save(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function updateArtist(request) {
  return new Promise((resolve,reject)=> {
    var update = {
      name: request.name,
      modified: Date.now()
      // artist: request.artist

    };
    Artist.findOneAndUpdate({
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

function deleteArtist(request) {
  return new Promise((resolve, reject) => {
    Artist.findOneAndRemove({
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
