var router = require('express').Router();
var videoDao = require('./../dao/video.dao');

router.get('/video', getVideo);
router.get('/rankvideo/:country', getRankVideos);
router.get('/newvideo/:country', getNewVideos);
router.get('/video/:id', getVideoPlay);
router.get('/videosinger/:singer', getVideoSinger);
router.get('/recvideo/:name', getRecommendVideo);
router.get('/searchVideo/:name', searchVideo);

module.exports = router;

function getVideoSinger(req, res, next) {
  var request = {
    singer: req.params.singer
  };
  videoDao.getVideoSinger(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function getVideoPlay(req, res, next) {
  var request = {
    id: req.params.id
  };
  videoDao.getVideoPlay(request).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    next(err);
  });
}

function getRecommendVideo(req, res, next) {
  var request = {
    name: req.params.name
  };
  videoDao.getRecommendVideo(request).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    next(err);
  });
}

function getRankVideos(req, res, next) {
  var request = {
    country: req.params.country
  };
  videoDao.getRankVideos(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function getNewVideos(req, res, next) {
  var request = {
    country: req.params.country
  };
  videoDao.getNewVideos(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function getVideo(req, res, next) {
  var request = {
    //limit: req.body.limit
  };
  videoDao.getVideo(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function searchVideo(req, res, next) {
  var request = {
    name: req.params.name
  };
  videoDao.searchVideo(request).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    next(err);
  });
}

/*function addVideo(req, res, next) {
  var request = {
    Namesong: req.body.Namesong,
    Namesinger: req.body.Namesinger,
    Author: req.body.Author,
    Lyrics: req.body.Lyrics,
    Update: req.body.Update,
    Images: req.body.Images,
    Link: req.body.Link,
    Plays: req.body.Plays
  };
  videoDao.addVideo(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function updateVideo(req,res,next){
  var request = {
    Namesong: req.body.Namesong,
    Namesinger: req.body.Namesinger,
    Author: req.body.Author,
    Lyrics: req.body.Lyrics,
    Update: req.body.Update,
    Images: req.body.Images,
    Link: req.body.Link,
    Plays: req.body.Plays
  };
  videoDao.updateVideo(request).then(function(response){
    res.send(response);
  }).catch(function(err){
    next(err);
  });
}

function deleteVideo(req,res,next){

  var request = {
   // title:req.params.title
   id:req.params.id
  };
  videoDao.deleteVideo(request).then(function(respose) {
    res.send(respose);
  }).catch(function(err) {
    next(err);
  });
}*/
