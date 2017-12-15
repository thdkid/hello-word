var router = require('express').Router();
var multer = require('multer');
var four0four = require('./../utils/404')();
var data = require('./../data');
var Genre = require('./../models/genre');
var videoDao = require('./../dao/video.dao');
//Thu muc luu hinh
var storageHinh = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/server/data/img');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var storageMp3 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/server/data/songs');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
//Function upload file
var uploadHinhanh = multer({
  storage: storageHinh
}).single('file');
var uploadNhac = multer({
  storage: storageMp3
}).single('file');
//Route
router.get('/genres', getGenres);
router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/*', four0four.notFoundMiddleware);
router.post('/uploadhinh', uploadImage);
router.post('/uploadmp3', uploadMp3);
module.exports = router;

function uploadImage(req, res, next) {
  uploadHinhanh(req, res, function (err) {
    if (err) {
      return res.send({
        message: 'Upload Image Error'
      });
    }
    res.send({
      message: 'Upload image Success'
    });
  });
}

function uploadMp3(req, res, next) {
  uploadNhac(req, res, function (err) {
    if (err) {
      return res.send({
        message: 'Upload mp3 Error'
      });
    }
    res.send({
      message: 'Upload mp3 Success'
    });
  });
}

//////////////
function getGenres(req, res, next) {
  Genre.getGenres(function (err, genres) {
    if (err) {
      throw err;
    } else {
      res.status(200).send(genres);
    }
  });
}

function getPeople(req, res, next) {
  res.status(200).send(data.people);
}

function getPerson(req, res, next) {
  var id = +req.params.id;
  var person = data.people.filter(function (p) {
    return p.id === id;
  })[0];

  if (person) {
    res.status(200).send(person);
  } else {
    four0four.send404(req, res, 'person ' + id + ' not found');
  }
}
