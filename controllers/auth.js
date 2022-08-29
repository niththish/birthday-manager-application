const login = async(req,res,next) => {
    res.send("login page")
}

const signup = async(req,res,next) => {
    res.send("signup")
}

module.exports = { login, signup }