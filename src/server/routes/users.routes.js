var router = require('express').Router();
var userDao = require('./../dao/users.dao');

router.get('/user', getUser);
router.get('/user/:id', getUserDetail);
router.post('/user', addUser);
router.put('/user/:id',updateUser);
router.delete('/user/:id',deleteUser);

module.exports = router;

function deleteUser (req, res, next) {
  var request = {
      id: req.params.id
    };
  userDao.deleteUser(request).then(function(response) {
      res.send(response);
    }).catch(function(err) {
      next(err);
    });
}

function updateUser (req, res, next) {
  var request = {
      id: req.params.id,
      auth:req.body.auth
    };
  userDao.updateUser(request).then(function(response) {
      res.send(response);
    }).catch(function(err) {
      next(err);
    });
}

function addUser (req, res, next) {
  var request = {
      id: req.body.id,
      auth: req.body.auth
    };
  userDao.addUser(request).then(function(response) {
      res.send(response);
    }).catch(function(err) {
      next(err);
    });
}

function getUserDetail (req, res, next) {
  var request = {
      id: req.params.id
    };
  userDao.getUserDetail(request).then(function(response) {
      res.send(response);
    }).catch(function(err) {
      next(err);
    });
}

function getUser (req, res, next) {
  var request = {
    //limit: req.body.limit
  };
  userDao.getUsers(request).then(function (response) {
    res.send(response);
  }).catch(function (err) {
    next(err);
  });
}
