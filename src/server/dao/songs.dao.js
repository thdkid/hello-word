var Song = require('./../models/songs.models');
//var message = require('./../utils/message');

module.exports = {
  getSong: getSong,
  getRankSongs: getRankSongs,
  getNewSongs: getNewSongs,
  getSongPlay: getSongPlay,
  getSongSinger: getSongSinger,
  getRecommendSong: getRecommendSong,
  searchSong: searchSong,
  addSong: addSong,
  updateSong:updateSong,
  deleteSong: deleteSong,
  counterPlays: counterPlays
};

function getRecommendSong(request) {
  return new Promise((resolve, reject) => {
    Song.aggregate([{$sample: {size: 11}},{$match: {name: {$ne : request.name}}}]).limit(10).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getSongSinger(request) {
  return new Promise((resolve, reject) => {
    Song.find({singer: request.singer}).limit(10).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getRankSongs(request) {
  return new Promise((resolve, reject) => {
    Song.find({country: request.country}).sort({plays: -1}).limit(10).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getNewSongs(request) {
  return new Promise((resolve, reject) => {
    Song.find({country: request.country}).sort({update: -1}).limit(10).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getSongPlay(request) {
  //-------Get and play song-------
  return new Promise((resolve, reject) => {
    Song.findOne({_id: request.id }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function searchSong(request) {
  return new Promise((resolve, reject) => {
    Song.find({ name: { '$regex': request.name, '$options': 'i' } }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getSong(request) {
  return new Promise((resolve, reject) => {
    Song.find({}).limit(request.limit).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function addSong(request) {
  return new Promise((resolve, reject) => {
    var newSong = new Song({
      name: request.name,
      artist: request.artist,
      url: request.url,
      img: request.img,
      genre: request.genre,
      singer: request.singer,
      update: Date.now(),
      plays: 0,
      lyrics: request.lyrics,
      country: request.country
    });
    newSong.save(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function updateSong(request) {
  return new Promise((resolve,reject)=> {
    var update = {
      name: request.name,
      artist: request.artist,
      url: request.url,
      img: request.img,
      modified: Date.now(),
      genre: request.genre,
      singer: request.singer,
      lyrics:request.lyrics,
      country:request.country
    };
    Song.findOneAndUpdate({
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

function deleteSong(request) {
  return new Promise((resolve, reject) => {
    Song.findOneAndRemove({
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

function counterPlays(request){
  return new Promise((resolve, reject) => {
    //   var update = {
    //   plays: request.plays,
    // };
    Song.findOneAndUpdate({_id: request.id} ,{$inc: { 'plays': +1 } }).exec(function(err,res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
    });
}
