
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateCode } = require('../utils/helpers');

router.post('/register', async (req,res)=>{
  const { name, email, password, referredBy } = req.body;
  if(!email || !password) return res.status(400).json({message:'Email+password required'});
  const exists = await User.findOne({ email });
  if(exists) return res.status(400).json({message:'Email exists'});
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password:hash, referralCode: generateCode('REF'), referredBy });
  const token = jwt.sign({ id:user._id, role:user.role, name:user.name }, process.env.JWT_SECRET);
  res.json({ token, user:{ id:user._id, name:user.name, email:user.email, role:user.role, referralCode:user.referralCode } });
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if(!u) return res.status(404).json({message:'User not found'});
  const ok = await bcrypt.compare(password, u.password);
  if(!ok) return res.status(400).json({message:'Invalid creds'});
  const token = jwt.sign({ id:u._id, role:u.role, name:u.name }, process.env.JWT_SECRET);
  res.json({ token, user:{ id:u._id, name:u.name, email:u.email, role:u.role, referralCode:u.referralCode } });
});

module.exports = router;
