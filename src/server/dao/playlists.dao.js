var Playlist = require('./../models/playlists.models');

module.exports = {
  getPlaylist: getPlaylist,
  getPlaylistDetail: getPlaylistDetail,
  addPlaylist: addPlaylist,
  updatePlaylist: updatePlaylist,
  removePlaylist: removePlaylist,
  addSongtoPlaylist: addSongtoPlaylist,
  removeSongfromPlaylist: removeSongfromPlaylist
};

function removeSongfromPlaylist(request) {
  return new Promise((resolve, reject) => {
    Playlist.findOneAndUpdate({ _id: request.id }, {
      $pull: {
        listsong: { id: request.idSong }
      }
    }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function addSongtoPlaylist(request) {
  return new Promise((resolve, reject) => {
    Playlist.findOneAndUpdate({ _id: request.id }, {
      $push: {
        listsong:
        {
          id: request.idSong,
          name: request.name + ' - ' + request.singer,
          file: request.file,
          length: '--:--'
        }
      }
    }, { safe: true, upsert: true }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve('Push Ok');
      }
    });
  });
}

function getPlaylistDetail(request) {
  return new Promise((resolve, reject) => {
    Playlist.findOne({ _id: request.id }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getPlaylist(request) {
  return new Promise((resolve, reject) => {
    Playlist.find({ userID: request.id }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function addPlaylist(request) {
  return new Promise((resolve, reject) => {
    var playlists = new Playlist({
      userID: request.id,
      name: request.name,
      update: Date.now(),
      plays: 0,
    });
    playlists.save(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function updatePlaylist(request) {
  return new Promise((resolve, reject) => {
    Playlist.findOneAndUpdate({ _id: request.id }, { $set: { name: request.name } }).exec(function (err, res) {
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

function removePlaylist(request) {
  return new Promise((resolve, reject) => {
    Playlist.findOneAndRemove({
      _id: request.id
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

