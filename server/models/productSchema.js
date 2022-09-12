const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:[true, "Please enter product name"]

    },
    slug:{
        type:String,
        trim:true,
        required:[true, "Please enter product slug"],
        minlength:[5, "slug should be greater than 5 charecters"],
        unique:true
    },

    brand:{
        type:String,
        trim:true,
        required:[true, "Please enter product brand"]
    },
    sellingPrice:{
        type:Number,
        required:[true, "Please enter product selling price"]
    },
    retailPrice:{
        type:Number,
        required:[true, "Please enter product retail price"]
    },
    discount:{
        type:Number,
        default:0,
        required:[true, "Please enter product discount"]
    },
    productDetails:{
        type:String,
        trim:true,
        required:[true, "Please enter product details"]
    },
    productSize:[
        {
            productSize:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                required:[true, "Please enter product quantity"]
            }
        }
    ],
    category:{
        type:String,
        required:[true, "Please enter product category"]

    },
    subCategory:{
        type:String,
        required:[true, "Please enter product subcategory"]

    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    rating:{
        type:Number,
        default:0,
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                trim:true,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                trim:true,
                required:true
            }
        }
    ],
    seller:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model("Product", productSchema);