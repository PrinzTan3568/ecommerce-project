
const mongoose = require('mongoose');
const s = new mongoose.Schema({ user:{type:mongoose.Schema.Types.ObjectId, ref:'User'}, items:[{product:{type:mongoose.Schema.Types.ObjectId, ref:'Product'}, qty:Number, price:Number}], subtotal:Number, discount:Number, total:Number, status:{type:String, default:'pending'} },{timestamps:true});
module.exports = mongoose.model('Order', s);
