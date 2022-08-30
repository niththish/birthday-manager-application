const birthdaySchema = require('../models/birthdays')

const getAllBirthdays = async(req,res,next) => {
    const birthdays = await birthdaySchema.find({ createdBy : req.userId}, { createdBy : 0})
    res.json({status : "success", data : birthdays})
}

const insertBirthday = async(req,res,next) => {
    req.body.createdBy = req.userId;
    const birthday = await birthdaySchema.create(req.body)
    res.json({ status : "success", msg : "inserted a new birthday detail"})
}

const updateBirthday = async(req,res,next) => {
    const birthdayId = req.params.id;
    const updateQuery = {
        name : req.body.name,
        birthdate : req.body.birthdate
    }
    const birthday = await birthdaySchema.findOneAndUpdate({_id : birthdayId, createdBy : req.userId},updateQuery,{new : true, runValidators : true})
    if(birthday) return res.json({status : "success", msg : "updated birthday detail"})
    res.send("invalid birthday user information")
}

const deleteBirthday = async(req,res,next) => {
    const birthdayId = req.params.id;
    const deleteStatus = await birthdaySchema.findOneAndDelete({_id : birthdayId, createdBy : req.userId},{new : true, runValidators : true})
    if(deleteStatus) return res.json({status : "success", msg : "deleted birthday detail"})
    res.send("invalid birthday user information")
}

module.exports = { getAllBirthdays, insertBirthday, updateBirthday, deleteBirthday }