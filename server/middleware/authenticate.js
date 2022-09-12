const jwt = require('jsonwebtoken')
const asyncCatchErrors = require('./asyncCatchErrors');
const ErrorHandler = require("../utils/errorHandler");
const UserModel = require('../models/userSchema');


exports.isAuthenticated = asyncCatchErrors( async (req, res, next) => {

    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler('Please login to access this resource', 403))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await UserModel.findById(decodedData.id)
    next();
})

exports.authorizeRoles = (...roles) => {
    return  (req, res, next) => {

        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: '${req.user.role}' is not allowed to access this resource`, 403))
        }
        next();
    }

}