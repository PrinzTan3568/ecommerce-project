
const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
router.get('/', auth, async (req,res)=>{ const q = req.user.role==='admin' ? {} : { user:req.user.id }; res.json(await Order.find(q).populate('items.product')); });
router.post('/', auth, async (req,res)=>{
  const { items, coupon } = req.body;
  const subtotal = items.reduce((s,i)=> s + i.price * i.qty, 0);
  const discount = coupon?.amount || 0;
  const total = Math.max(0, subtotal - discount);
  const order = await Order.create({ user:req.user.id, items: items.map(i=>({ product:i.productId, qty:i.qty, price:i.price })), subtotal, discount, total });
  await User.findByIdAndUpdate(req.user.id, { $inc: { points: Math.floor(total) } });
  res.status(201).json(order);
});
module.exports = router;
