
const mongoose = require('mongoose');
const s = new mongoose.Schema({ code:{type:String, unique:true}, type:String, value:Number, minSpend:Number, expiresAt:Date, active:Boolean },{timestamps:true});
module.exports = mongoose.model('Coupon', s);
