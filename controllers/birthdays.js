const getAllBirthdays = async(req,res,next) => {
    res.send("all birthdays")
}

const getMonthwiseBirthdays = async(res,res,next) => {
    res.send("monthwise birthdays")
}

module.exports = { getAllBirthdays, getMonthwiseBirthdays }