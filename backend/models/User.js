
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name:String, email:{type:String, unique:true}, password:String, role:{type:String, default:'customer'},
  points:{type:Number, default:0}, referralCode:{type:String}, referredBy:{type:String}
},{timestamps:true});
module.exports = mongoose.model('User', schema);
