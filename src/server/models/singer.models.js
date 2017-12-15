var mongoose = require('mongoose');
var singerSchema = mongoose.Schema({
  name: String
});
var Singers = module.exports = mongoose.model('Singers',singerSchema);
