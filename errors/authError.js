const { StatusCodes } = require('http-status-codes')

class AuthError extends Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.FORBIDDEN
    }
}

const throwAuthError = (msg) => new AuthError(msg)

module.exports = { AuthError, throwAuthError }