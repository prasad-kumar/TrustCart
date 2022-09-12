const express = require('express');
const { 
    newOrder, 
    getSingleOrder, 
    getAllOrders, 
    getMyOrders, 
    updateOrderStatus, 
    deleteOrder 
} = require('../controllers/ordersController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authenticate');


const router = express.Router();

// routes
router.route("/order/new").post(isAuthenticated, newOrder)


router.route("/orders/me").get(isAuthenticated, getMyOrders)


//admin
router.route("/admin/orders").get(isAuthenticated, authorizeRoles("admin"), getAllOrders)
router.route("/admin/order/:id")
.get(isAuthenticated, getSingleOrder)
.put(isAuthenticated, authorizeRoles("admin"), updateOrderStatus)
.delete(isAuthenticated, authorizeRoles("admin"), deleteOrder)




module.exports = router;