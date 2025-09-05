
const router = require('express').Router();
const Product = require('../models/Product');
router.get('/', async (req,res)=>{ res.json(await Product.find({status:'active'}).sort({createdAt:-1})); });
router.get('/:slug', async (req,res)=>{ const p=await Product.findOne({slug:req.params.slug}); if(!p) return res.status(404).json({}); res.json(p); });
router.post('/', async (req,res)=>{ const p = await Product.create(req.body); res.status(201).json(p); });
module.exports = router;
