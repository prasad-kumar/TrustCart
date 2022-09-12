const express = require('express');
const { 
    createProduct, 
    getAllProducts, 
    getOneProduct, 
    updateProduct, 
    deleteProduct, 
    createProductReview,
    getProductReviews,
    deleteProductReview,
    getAdminProducts
} = require('../controllers/productController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authenticate');

const router = express.Router();


// routes
router.route("/products/new").post(isAuthenticated, authorizeRoles("admin"), createProduct);

router.route("/products").get(getAllProducts);

router.route("/admin/products").get(isAuthenticated, authorizeRoles("admin"), getAdminProducts);

router.route("/product/:id").get(getOneProduct)
.put(isAuthenticated, authorizeRoles("admin"), updateProduct)
.delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)


router.route("/review").put(isAuthenticated, createProductReview)

router.route("/reviews").get(getProductReviews)
.delete(isAuthenticated, deleteProductReview)


module.exports = router;