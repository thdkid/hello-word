var router = require('express').Router();
var playlistDao = require('./../dao/playlists.dao');

router.get('/playlists/:id', getPlaylist);
router.get('/playlist/:id', getPlaylistDetail);
router.post('/playlist', addPlaylist);
router.put('/playlistpush/:id', pushSong);
router.put('/playlist/:id', editPlaylist);
router.delete('/playlist/:id', deletePlaylist);
router.delete('/playlist/:id/:idSong', deleteSongfromPlaylist);

module.exports = router;

function deleteSongfromPlaylist(req,res,next) {
  var request = {
    id: req.params.id,
    idSong: req.params.idSong
  };
  playlistDao.removeSongfromPlaylist(request).then(function(response){
    res.send(response);
  }).catch(function(err){
    next(err);
  });
}

function getPlaylistDetail(req, res, next) {
  var request = {
      id: req.params.id
    };
  playlistDao.getPlaylistDetail(request).then(function (response) {
      res.send(response);
    }).catch(function (err) {
      next(err);
    });
}

function deletePlaylist(req,res,next) {
  var request = {
      id: req.params.id
    };
  playlistDao.removePlaylist(request).then(function(response) {
      res.send(response);
    }).catch(function(err) {
      next(err);
    });
}

function editPlaylist(req, res, next) {
  var request = {
      id: req.params.id,
      name: req.body.name
    };
  playlistDao.updatePlaylist(request).then(function (response) {
      res.send(response);
    }).catch(function (err) {
      next(err);
    });
}

function pushSong(req, res, next) {
  var request = {
      id: req.params.id,
      name: req.body.name,
      file: req.body.file,
      singer: req.body.singer,
      idSong: req.body.id
    };
  playlistDao.addSongtoPlaylist(request).then(function (response) {
      res.send(response);
    }).catch(function (err) {
      next(err);
    });
}

function getPlaylist(req, res, next) {
  var request = {
      id: req.params.id
    };
  playlistDao.getPlaylist(request).then(function (response) {
      res.send(response);
    }).catch(function (err) {
      next(err);
    });
}

function addPlaylist(req, res, next) {
  var request = {
      name: req.body.name,
      id: req.body.id
    };
  playlistDao.addPlaylist(request).then(function (response) {
      res.send(response);
    }).catch(function (err) {
      next(err);
    });
}
