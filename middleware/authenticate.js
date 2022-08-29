const jwt = require('jsonwebtoken')

const authenticate = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) return next("token not present")
    const token = authHeader.split(" ")[1]
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decode.userId
        next()
    }catch(err){
        return next("invalid token")
    }
}

module.exports = authenticate