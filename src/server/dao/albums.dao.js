var Album = require('./../models/albums.models');
//var message = require('./../utils/message');

module.exports = {
  //getAlbum: getAlbum,
  getNewAlbum: getNewAlbum,
  getPlayAlbum: getPlayAlbum
};

function getNewAlbum(request) {
  return new Promise((resolve, reject) => {
    Album.find({}).limit(10).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getPlayAlbum(request) {
  //-------Get and play album-------
  return new Promise((resolve, reject) => {
    Album.findById(request.id).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}
