const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isemail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:[true, "Please enter your name"],
        minlength:[4, "Name should be greater than 4 charecters"],
        maxlength:[20, "Name should be less than 20 charecters"]
    },
    email:{
        type:String,
        trim:true,
        required:[true, "Please enter your email"],
        unique:true,
        validate:[isEmail, "Please enter valid email"]
    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        minlength:[8, "Password should be greater than 8 charecters"],
        select:false
    },
    role:{
        type:String,
        default:"user"
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    active:{
        type:Boolean,
        default:true
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

})

// hashing password
userSchema.pre("save", async function(next){
    
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

// creating JWT token
userSchema.methods.getJWTToken = function(next){
    const token = jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {expiresIn:process.env.JWT_EXPIRE})
    return token
}

// 
userSchema.methods.comparePassword =  async function(enteredPassword, next){
    return bcrypt.compare(enteredPassword, this.password);
}

//generating reset password token
userSchema.methods.getResetPasswordToken = function(next){

    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash and  adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}


module.exports = mongoose.model("User", userSchema);