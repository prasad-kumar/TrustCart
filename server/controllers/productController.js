const asyncCatchErrors = require("../middleware/asyncCatchErrors");
const ProductModel = require("../models/productSchema");
const ErrorHandler = require("../utils/errorHandler");
const FilterProducts = require("../utils/filter");
const cloudinary = require('cloudinary');

// creating product (Admin)
exports.createProduct = asyncCatchErrors(async (req, res, next) => {

  // product size implementaion
  const newSizes = req.body.sizes.split(" ")
  const newQuantity = req.body.quantity.split(" ")

  const productSizes = [];

  for(let i in newSizes){
    productSizes.push({productSize : newSizes[i],quantity: Number(newQuantity[i])})
  }
  req.body.productSize = productSizes

  // checking images
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  
  const imagesLinks = [];
  
  // images uploading to cloudinary
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.seller = req.user._id;

  const product = await ProductModel.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product
  });
});


// get all products
exports.getAllProducts = asyncCatchErrors(async (req, res, next) => {

  const productCount = await ProductModel.countDocuments();
  const resultsPerPage = process.env.RESULTS_PER_PAGE;
  const filterProduct = new FilterProducts(ProductModel.find(), req.query)
    .search()
    .filter()
  let products = await filterProduct.query;
  let filteredProductsCount = products.length;
  
  filterProduct.pagination(resultsPerPage);
  products = await filterProduct.query.clone();

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    filteredProductsCount,
  });
});


//getAdminProducts
exports.getAdminProducts = asyncCatchErrors(async (req, res, next) => {

  const products = await ProductModel.find();

  res.status(200).json({
    success: true,
    products,
  });
});


// get one product
exports.getOneProduct = asyncCatchErrors(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id).populate(
    "reviews.user",
    "avatar"
  );

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(201).json({
    success: true,
    product,
  });
});

// update product (Admin)
exports.updateProduct = asyncCatchErrors(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // product size implementaion
  const newSizes = req.body.sizes.split(" ")
  const newQuantity = req.body.quantity.split(" ")

  const productSizes = [];

  for(let i in newSizes){
    productSizes.push({productSize : newSizes[i],quantity: Number(newQuantity[i])})
  }
  req.body.productSize = productSizes

  // checking images
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

  const imagesLinks = [];
  
  // images uploading to cloudinary
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  
  }
  product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(201).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

// delete product (Admin)
exports.deleteProduct = asyncCatchErrors(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // deleting images from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await product.remove();

  res.status(201).json({
    success: true,
    message: "Product deleted successfully",
  });
});

//creating or updating review
exports.createProductReview = asyncCatchErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await ProductModel.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviwed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviwed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //calculate average rating
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.rating = (avg / product.reviews.length).toFixed(1);

  await product.save({ validateBefofeSave: false });

  res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});

// get product reviews
exports.getProductReviews = asyncCatchErrors(async (req, res, next) => {
  
  const product = await ProductModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete product review (Admin)
exports.deleteProductReview = asyncCatchErrors(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let rating = 0;

  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await ProductModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
