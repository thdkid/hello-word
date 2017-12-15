var router = require('express').Router();
var genreDao = require('./../dao/genres.dao');

router.get('/getGenre', getGenre);
router.post('/genre', addGenre);
router.put('/genre/:id',updateGenre);
router.delete('/genre/:id',deleteGenre);

module.exports = router;

function getGenre(req, res, next) {
  var request = {};
  genreDao.getGenre(request).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    next(err);
  });
}

function addGenre(req, res, next) {
  var request = {
    name: req.body.name
    // genre: req.body.genre,
  };
  genreDao.addGenre(request).then(function (respose) {
    res.send(respose);
  }).catch(function (err) {
    next(err);
  });
}

function updateGenre(req,res,next) {
  var request = {
    id:req.params.id,
    name : req.body.name
    // genre : req.body.genre,
  };
  genreDao.updateGenre(request).then(function(respose) {
    res.send(respose);
  }).catch(function(err) {
    next(err);
  });
}

function deleteGenre(req,res,next) {
  var request = {
    id:req.params.id
  };
  genreDao.deleteGenre(request).then(function(respose) {
    res.send(respose);
  }).catch(function(err) {
    next(err);
  });
}
