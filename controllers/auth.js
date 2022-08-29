const userSchema = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async(req,res,next) => {
    const { username, password } = req.body;
    if(!username || !password) return next("provide username and password")
    const user = await userSchema.findOne({username})
    if(user){
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(isPasswordCorrect){
            const token = jwt.sign({userId : user._id},process.env.JWT_SECRET,{expiresIn : process.env.JWT_LIFETIME})
            return res.json({status : 'success',token : token})
        }
        return next("password incorrect")
    }
    return next('username is not found')
}

const signup = async(req,res,next) => {
    const { username, password } = req.body;
    console.log(username,password);
    if(!username || !password) return next("provide username and password")
    const user = await userSchema.findOne({username})
    if(!user) {
        const user = await userSchema.create(req.body)
        return res.send("registered successfully")
    }
    return next("username already taken")
}

module.exports = { login, signup }