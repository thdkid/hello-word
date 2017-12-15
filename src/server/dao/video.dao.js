var Video = require('./../models/videos.models');
//var message = require('./../utils/message');

module.exports = {
  getVideo: getVideo,
  getVideoPlay: getVideoPlay,
  getVideoSinger: getVideoSinger,
  getRankVideos: getRankVideos,
  getNewVideos: getNewVideos,
  getRecommendVideo: getRecommendVideo,
  searchVideo: searchVideo
  //addVideo: addVideo,
  //updateVideo: updateVideo,
  //deleteVideo: deleteVideo
};

function getVideoPlay(request) {
  return new Promise((resolve, reject) => {
    Video.findOne({ _id: request.id }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getVideoSinger(request) {
  return new Promise((resolve, reject) => {
    Video.find({singer: request.singer}).limit(10).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getRankVideos(request) {
  return new Promise((resolve, reject) => {
    Video.find({ country: request.country }).sort({ plays: -1 }).limit(10).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getNewVideos(request) {
  return new Promise((resolve, reject) => {
    Video.find({country: request.country}).sort({update: -1}).limit(10).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getRecommendVideo(request) {
  return new Promise((resolve, reject) => {
    Video.aggregate([{$sample: {size: 11}},{$match: {name: {$ne : request.name}}}]).limit(10).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function getVideo(request) {
  return new Promise((resolve, reject) => {
    Video.find({}).limit(request.limit).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function searchVideo(request) {
  return new Promise((resolve, reject) => {
    Video.find({ name: { '$regex': request.name, '$options': 'i' } }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

/*function getVideo(request) {
  return new Promise((resolve, reject) => {
    Video.find({}).limit(request.limit).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        var kq = [];
        for (var i = 0; i < res.length; i++) {
          kq[i] = {
            "name": res[i].Namesong,
            "singer": res[i].Namesinger
          };
          resolve(kq);
        }
      }
    });
  });
}*/

/*function addVideo(request) {
  return new Promise((resolve, reject) => {
    Video.findOne({
      _id: request.id,
    }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        if (!res) {
          var newVideo = new Video({
            Namesong: request.Namesong,
            Namesinger: request.Namesinger,
            Author: request.Author,
            Lyrics: request.Lyrics,
            Update: request.Update,
            Images: request.Images,
            Link: request.Link,
            Plays: request.Plays
          });
          newVideo.save(function (err, res) {
            if (err) {
              reject(err);
            }
            else {
              resolve(res);
            }
          });
        }
        else {
          reject(err);
        }
      }
    });
  });
}

function updateVideo(request) {
  return new Promise((resolve, reject) => {
    var update = {
      Namesong: request.Namesong,
      Namesinger: request.Namesinger,
      Author: request.Author,
      Lyrics: request.Lyrics,
      Update: request.Update,
      Images: request.Images,
      Link: request.Link,
      Plays: request.Plays
    };
    Video.findOneAndUpdate({
      _id: request.id
    }, update, { new: true }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}

function deleteVideo(request) {
  return new Promise((resolve, reject) => {
    Video.findOneAndRemove({
      // title:request.title,
      _id: request.id
    }).exec(function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    });
  });
}*/
