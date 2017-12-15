var config = require('./../config').mongodb;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.host + '/' + config.database, {
  useMongoClient: true
});
