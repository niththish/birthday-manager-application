const jwt = require('jsonwebtoken');
const { throwAuthError } = require('../errors/authError');

const authenticate = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) return next(throwAuthError("token not present"))
    const token = authHeader.split(" ")[1]
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decode.userId
        next()
    }catch(err){
        return next(throwAuthError("invalid token"))
    }
}

module.exports = authenticate