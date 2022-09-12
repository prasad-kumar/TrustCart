const asyncCatchErrors = require("../middleware/asyncCatchErrors");
const ProductModel = require("../models/productSchema");
const ErrorHandler = require("../utils/errorHandler");
const OrderModel = require("../models/orderSchema");

// create Order
exports.newOrder = asyncCatchErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await OrderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order (Admin)
exports.getSingleOrder = asyncCatchErrors(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id).populate([
    "user",
    "orderItems.product",
  ]);

  if (!order) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get my Orders
exports.getMyOrders = asyncCatchErrors(async (req, res, next) => {
  const orders = await OrderModel.find({ user: req.user._id }).populate(
    "orderItems.product",
    "images"
  );

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders (Admin)
exports.getAllOrders = asyncCatchErrors(async (req, res, next) => {
  const orders = await OrderModel.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update order status
exports.updateOrderStatus = asyncCatchErrors(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order alreday delivered", 404));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (item) => {
      await updateQuantity(item.product, item.size, item.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    massage: "Order Updated Successfully",
  });
});

//delete order
exports.deleteOrder = asyncCatchErrors(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order Not Found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: "Order Deleted Successfully",
  });
});

async function updateQuantity(id, size, quantity) {
  const product = await ProductModel.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found with this Id", 404));
  }

  product.productSize.forEach((elem) => {
    if (elem.productSize == size) {
      elem.quantity -= quantity;
    }
  });

  await product.save({ validateBeforeSave: false });
}
