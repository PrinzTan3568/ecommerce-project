
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const Coupon = require('./models/Coupon');

(async()=>{
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({}); await Product.deleteMany({}); await Coupon.deleteMany({});
  const admin = await User.create({ name:'Admin', email:'admin@demo.com', password: await bcrypt.hash('admin123',10), role:'admin', referralCode:'ADMIN01' });
  await Product.insertMany([{ name:'Wireless Earbuds', slug:'wireless-earbuds', price:49.9, stock:100, description:'Demo' }, { name:'Smart Watch', slug:'smart-watch', price:79.0, stock:50, description:'Demo' }]);
  await Coupon.create({ code:'WELCOME10', type:'percent', value:10, active:true });
  console.log('Seed done');
  process.exit(0);
})();
