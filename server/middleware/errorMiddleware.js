const ErrorHandler = require('../utils/errorHandler');

module.exports = (error, req, res, next) => {

    error.statusCode = error.statusCode || 500 ;
    error.message = error.message || "Internal server error";

    // mongodb cast error
    if(error.name === "CastError"){
        const message = `Resource not found, Invalid ${error.path}`;
        error = new ErrorHandler(message, 400)
    }

    // mongoose duplicate key error
    if(error.code === 11000){
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
        error = new ErrorHandler(message, 400)
    }

    // JWT error
    if(error.name === "JsonWebTokenError"){
        const message = "JsonWebToken is invalid, try again";
        error = new ErrorHandler(message, 400)
    }

    // JWT Expire error
    if(error.name === "JsonWebExpiredError"){
        const message = "JsonWebToken is Expired, try again";
        error = new ErrorHandler(message, 400)
    }
    

    res.status(error.statusCode).json({
        success:false,
        message: error.message
    })
}
