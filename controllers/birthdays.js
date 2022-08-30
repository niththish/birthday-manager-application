const birthdaySchema = require('../models/birthdays')

const getAllBirthdays = async(req,res,next) => {
    const birthdays = await birthdaySchema.find({ createdBy : req.userId}, { createdBy : 0})
    res.json({status : "success", data : birthdays})
}

const insertBirthday = async(req,res,next) => {
    req.body.createdBy = req.userId;
    console.log(req.body);
    const birthday = await birthdaySchema.create(req.body)
    res.json({ status : "success", msg : "inserted a new birthday detail"})
}

module.exports = { getAllBirthdays, insertBirthday }