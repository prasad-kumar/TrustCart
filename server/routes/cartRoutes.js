const express = require('express');
const { createCartItem, getCartItems, updateCartItemQuantity, deleteCartItem } = require('../controllers/cartController');
const { isAuthenticated } = require('../middleware/authenticate');

const router = express.Router();


router.route('/cart').get(isAuthenticated, getCartItems);
router.route('/cart/new').post(isAuthenticated, createCartItem);
router.route('/cart/:id').put(isAuthenticated, updateCartItemQuantity).delete(isAuthenticated, deleteCartItem)


module.exports = router;