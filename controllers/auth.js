const userSchema = require('../models/users')

const login = async(req,res,next) => {
    res.send("login page")
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