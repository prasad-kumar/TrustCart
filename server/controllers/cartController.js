const asyncCatchErrors = require("../middleware/asyncCatchErrors");
const CartModel = require('../models/cartSchema');
const ErrorHandler = require("../utils/errorHandler");


exports.createCartItem = asyncCatchErrors(async (req, res, next) => {

    const i = await CartModel.exists({size:req.body.size, product:req.body.product ,user:req.user._id})
    if(i){
        // res.status(200).json({
        //     success:false,
        //     message:"Product already added to your cart!"
        // })
        return next(new ErrorHandler("Product already added to your cart!", 400))
    }
    req.body.user = req.user._id
    const cartItem = await CartModel.create(req.body);
    
    res.status(201).json({
        success:true,
        message:"Product Added to Cart Successfully",
    })
})


exports.getCartItems = asyncCatchErrors(async (req, res, next) => {

    const cartItems = await CartModel.find({user:req.user._id}).populate("product", "discount images");
    const cartItemsCount = await CartModel.countDocuments();
    res.status(200).json({
        success:true,
        cartItems,
        cartItemsCount
    })

})

exports.updateCartItemQuantity = asyncCatchErrors( async (req, res, next) => {
    
    const cartitem = await CartModel.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});

    const cartItems = await CartModel.find({user:req.user._id}).populate("product", "discount images");
    
    const cartItemsCount = await CartModel.countDocuments();

    if (!cartitem) {
        return next(new ErrorHandler("Product not found", 404));
      }
    
      res.status(201).json({
        success: true,
        message: "Qauntity Updated Successfully",
        cartItems,
        cartItemsCount
      });
})

exports.deleteCartItem = asyncCatchErrors( async(req, res, next) => {
    const cartItem = await CartModel.findById(req.params.id);

    if(!cartItem){
        return next(new ErrorHandler("Product not found", 404));
    }

    await cartItem.remove();
    
    const cartItems = await CartModel.find({user:req.user._id}).populate("product", "discount images");
    
    const cartItemsCount = await CartModel.countDocuments();
    
    res.status(200).json({
        success:true,
        message:"CartItem Removed Successfully",
        cartItems,
        cartItemsCount
    })
})