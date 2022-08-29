const getAllBirthdays = async(req,res,next) => {
    res.send("all birthdays")
}

const getMonthwiseBirthdays = async(req,res,next) => {
    res.send("monthwise birthdays")
}

const insertBirthday = async(req,res,next) => {
    res.send("insert a new birthday")
}

module.exports = { getAllBirthdays, getMonthwiseBirthdays, insertBirthday }