var Users = require('./../models/users.models');

module.exports = {
    getUsers: getUsers,
    getUserDetail: getUserDetail,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
  };

function deleteUser(request) {
  return new Promise((resolve, reject) => {
      Users.findOneAndRemove({ _id: request.id }).exec(function (err, res) {
          if (err) {
            reject(err);
          }
          else {
            resolve({ message: 'Delete Ok' });
          }
        });
    });
}

function updateUser(request) {
  return new Promise((resolve, reject) => {
      Users.findOneAndUpdate({ _id: request.id }, { $set: { authority: request.auth } })
          .exec(function (err, res) {
              if (err) {
                reject(err);
              }
              else {
                resolve({ message: 'Update Ok' });
              }
            });
    });
}

function addUser(request) {
  return new Promise((resolve, reject) => {
      var newUser = new Users({
          userID: request.id,
          authority: request.auth
        });
      newUser.save(function (err, res) {
          if (err) {
            reject(err);
          }
          else {
            resolve(res);
          }
        });
    });
}

function getUserDetail(request) {
  return new Promise((resolve, reject) => {
      Users.findOne({ userID: request.id }).exec(function (err, res) {
          if (err) {
            reject(err);
          }
          else {
            resolve(res);
          }
        });
    });
}

function getUsers(request) {
  return new Promise((resolve, reject) => {
      Users.find({}).limit(request.limit).exec(function (err, res) {
          if (err) {
            reject(err);
          }
          else {
            resolve(res);
          }
        });
    });
}

