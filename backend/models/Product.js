
const mongoose = require('mongoose');
const s = new mongoose.Schema({ name:String, slug:String, brand:String, price:Number, stock:Number, images:[String], description:String, status:{type:String, default:'active'} },{timestamps:true});
module.exports = mongoose.model('Product', s);
