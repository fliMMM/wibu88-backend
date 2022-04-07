const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {type:String},
  username: {type:String, required:true},
  password: {type:String, required:true},
  email: {type: String},
  isAdmin : {type:Boolean, default:false},
  address: {type:String}
})

module.exports = mongoose.model('User', UserSchema);