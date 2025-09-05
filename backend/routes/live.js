
const router = require('express').Router();
router.get('/status', (req,res)=> res.json({ live:false }));
module.exports = router;
