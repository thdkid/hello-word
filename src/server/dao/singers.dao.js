var Singer = require('./../models/singer.models');
module.exports = {
  getSinger:getSinger,
  searchSinger:searchSinger,
  addSinger: addSinger,
  updateSinger:updateSinger,
  deleteSinger: deleteSinger
};

function getSinger(request) {
  return new Promise((resolve, reject) => {
    Singer.find({}).limit(request.limit).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}
function searchSinger(request) {
  return new Promise((resolve, reject) => {
    Singer.find({ name: { '$regex': request.name, '$options': 'i' } }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function addSinger(request) {
  return new Promise((resolve, reject) => {
    var newSinger = new Singer({
      name: request.name,
      update: Date.now()
      // artist: request.artist,

    });
    newSinger.save(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function updateSinger(request) {
  return new Promise((resolve,reject)=> {
    var update = {
      name: request.name,
      modified: Date.now()
      // artist: request.artist

    };
    Singer.findOneAndUpdate({
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

function deleteSinger(request) {
  return new Promise((resolve, reject) => {
    Singer.findOneAndRemove({
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
