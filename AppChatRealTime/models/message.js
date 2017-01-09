var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var mesSchema = mongoose.Schema({
  user_1: String,
  user_2: String,
  mes:[{
    from_user: String,
    content_mes: String
  }],
},
{
    collection : 'message'
});
module.exports = mongoose.model('Message', mesSchema);