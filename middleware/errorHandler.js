const { AuthError } = require("../errors/authError");

const errorHandler = async(err,req,res,next) => {
    if(err instanceof AuthError){
        return res.status(err.statusCode).send(err.message)
    }
    return res.status(500).send("something went wrong")
}

module.exports = errorHandler;