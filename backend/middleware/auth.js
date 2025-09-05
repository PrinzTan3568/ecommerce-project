
const jwt = require('jsonwebtoken');
module.exports = {
  auth: (req,res,next)=>{
    const h = req.headers.authorization;
    if(!h) return res.status(401).json({message:'No token'});
    const token = h.split(' ')[1];
    try{ req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }catch(e){ res.status(401).json({message:'Invalid token'}); }
  },
  permit: (...roles)=> (req,res,next)=>{
    if(!req.user) return res.status(401).json({message:'Unauthenticated'});
    if(!roles.includes(req.user.role)) return res.status(403).json({message:'Forbidden'});
    next();
  }
};
