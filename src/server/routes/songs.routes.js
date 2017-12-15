var router = require('express').Router();
var songDao = require('./../dao/songs.dao');

router.get('/song', getSong);
router.get('/searchSong/:name', searchSong);
router.get('/song/:id',getSongPlay);
router.get('/songsinger/:singer', getSongSinger);
router.get('/recsong/:name',getRecommendSong);
router.get('/ranksong/:country', getRankSongs);
router.get('/newsong/:country', getNewSongs);
router.post('/songs', addSong);
router.put('/songs/:id',updateSong);
router.put('/song/:id',counterPlays);
router.delete('/songs/:id',deleteSong);

module.exports = router;

function getSongSinger(req, res, next) {
  var request = {
    singer: req.params.singer
  };
  songDao.getSongSinger(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function getRankSongs(req, res, next) {
  var request = {
    country: req.params.country
  };
  songDao.getRankSongs(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function getNewSongs(req, res, next) {
  var request = {
    country: req.params.country
  };
  songDao.getNewSongs(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function getRecommendSong(req, res, next) {
  var request = {
    name: req.params.name
  };
  songDao.getRecommendSong(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function getSongPlay(req, res, next) {
  var request = {
    id: req.params.id
  };
  songDao.getSongPlay(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function getSong(req, res, next) {
  var request = {
    //limit: req.body.limit
  };
  songDao.getSong(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function searchSong(req, res, next) {
  var request = {
    name: req.params.name
  };
  songDao.searchSong(request).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    next(err);
  });
}

function addSong(req, res, next) {
  var request = {
    name: req.body.name,
    artist: req.body.artist,
    url: req.body.url,
    img: req.body.img,
    genre: req.body.genre,
    singer: req.body.singer,
    lyrics: req.body.lyrics,
    country:req.body.country
  };
  songDao.addSong(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function updateSong(req,res,next) {
  var request = {
    id:req.params.id,
    name : req.body.name,
    artist : req.body.artist,
    url : req.body.url,
    img : req.body.img,
    genre : req.body.genre,
    singer : req.body.singer,
    lyrics : req.body.lyrics,
    country:req.body.country
  };
  songDao.updateSong(request).then(function(respose) {
    res.send(respose);
  }).catch(function(err) {
    next(err);
  });
}

function deleteSong(req,res,next) {
  var request = {
    id:req.params.id
  };
  songDao.deleteSong(request).then(function(respose) {
    res.send(respose);
  }).catch(function(err) {
    next(err);
  });
}

  // khoa counter plays
function counterPlays(req, res, next){
  var request = {
    id: req.params.id

  };
   songDao.counterPlays(request).then(function(respose) {
    res.send(respose);
  }).catch(function(err) {
    next(err);
  });
}
