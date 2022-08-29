const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true,'username must be provided'],
        unique : [true,'user with same username already exists']
    },
    password : {
        type : String,
        required : [true,'password must be provided']
    }
})

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})


module.exports = mongoose.model('users',userSchema)