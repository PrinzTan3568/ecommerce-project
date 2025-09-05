
const router = require('express').Router();
const Coupon = require('../models/Coupon');
router.get('/', async (req,res)=> res.json(await Coupon.find().sort({createdAt:-1})));
router.post('/apply', async (req,res)=>{
  const { code, subtotal } = req.body;
  const c = await Coupon.findOne({ code, active:true });
  if(!c) return res.status(404).json({message:'Invalid coupon'});
  if(c.expiresAt && new Date(c.expiresAt) < new Date()) return res.status(400).json({message:'Expired'});
  if(subtotal < (c.minSpend||0)) return res.status(400).json({message:'Min spend'});
  let discount = 0; if(c.type==='percent') discount = subtotal * (c.value/100); if(c.type==='fixed') discount = c.value;
  res.json({ discount });
});
module.exports = router;
