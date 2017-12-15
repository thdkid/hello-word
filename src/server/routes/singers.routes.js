var router = require('express').Router();
var singerDao = require('./../dao/singers.dao');

router.get('/getSinger',getSinger);
router.get('/searchSinger/:name', searchSinger);
router.post('/singer', addSinger);
router.put('/singer/:id',updateSinger);
router.delete('/singer/:id',deleteSinger);

module.exports = router;

function getSinger(req, res, next) {
  var request = {};
  singerDao.getSinger(request).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    next(err);
  });
}

function searchSinger(req, res, next) {
  var request = {
    name: req.params.name
  };
  singerDao.searchSinger(request).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    next(err);
  });
}

function addSinger(req, res, next) {
  var request = {
    name: req.body.name
    // artist: req.body.artist,
  };
  singerDao.addSinger(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function updateSinger(req,res,next) {
  var request = {
    id:req.params.id,
    name : req.body.name
    // artist : req.body.artist,
  };
  singerDao.updateSinger(request).then(function(respose) {
    res.send(respose);
  }).catch(function(err) {
    next(err);
  });
}

function deleteSinger(req,res,next) {
  var request = {
    id:req.params.id
  };
  singerDao.deleteSinger(request).then(function(respose) {
    res.send(respose);
  }).catch(function(err) {
    next(err);
  });
}
