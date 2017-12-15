var router = require('express').Router();
var artistDao = require('./../dao/artists.dao');

router.get('/getArtist',getArtist);
router.get('/searchArtist/:name', searchArtist);
router.post('/artist', addArtist);
router.put('/artist/:id',updateArtist);
router.delete('/artist/:id',deleteArtist);

module.exports = router;

function getArtist(req, res, next) {
  var request = {};
  artistDao.getArtist(request).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    next(err);
  });
}

function searchArtist(req, res, next) {
  var request = {
    name: req.params.name
  };
  artistDao.searchArtist(request).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    next(err);
  });
}

function addArtist(req, res, next) {
  var request = {
    name: req.body.name
    // artist: req.body.artist,
  };
  artistDao.addArtist(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function updateArtist(req,res,next) {
  var request = {
    id:req.params.id,
    name : req.body.name
    // artist : req.body.artist,
  };
  artistDao.updateArtist(request).then(function(respose) {
    res.send(respose);
  }).catch(function(err) {
    next(err);
  });
}

function deleteArtist(req,res,next) {
  var request = {
    id:req.params.id
  };
  artistDao.deleteArtist(request).then(function(respose) {
    res.send(respose);
  }).catch(function(err) {
    next(err);
  });
}
