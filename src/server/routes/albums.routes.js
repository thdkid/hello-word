var router = require('express').Router();
var albumDao = require('./../dao/albums.dao');

router.get('/albumnew', getNewAlbum);
router.get('/albumplay/:id',getPlayAlbum);

module.exports = router;

function getNewAlbum(req, res, next) {
  var request = {
    //limit: req.body.limit
  };
  albumDao.getNewAlbum(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function getPlayAlbum(req, res, next) {
  var request = {
    id: req.params.id
  };
  albumDao.getPlayAlbum(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}
