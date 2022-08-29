const mongoose = require('mongoose')

const birthdaySchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,'person name must be provided'],
        trim : true,
        lowercase : true
    },
    birthdate : {
        type : Date,
        required : [true,'date must be provided']
    },
    createdBy : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'users',
        required : [true,'user must be provided']
    }
})

module.exports = mongoose.model('birthdays',birthdaySchema)