
const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');
router.get('/overview', async (req,res)=>{
  const users = await User.countDocuments();
  const orders = await Order.countDocuments();
  const salesAgg = await Order.aggregate([{ $group:{ _id:null, total:{ $sum:'$total' }}}]);
  res.json({ users, orders, sales: salesAgg[0]?.total || 0 });
});
module.exports = router;
