
function generateCode(prefix='REF'){ return prefix + Math.random().toString(36).slice(2,8).toUpperCase(); }
module.exports = { generateCode };
