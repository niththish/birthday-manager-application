const mongoose = require('mongoose')

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

module.exports = mongoose.model('users',userSchema)