const express = require("express");
const { 
    userRegister, 
    getProfile, 
    userLogin, 
    userLogout,
    forgotPassword, 
    resetPassword, 
    changePassword, 
    updateUser, 
    getAllUsers, 
    getSingleUser,
    updateUserRole,
    deleteUser
} = require("../controllers/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/authenticate");

const router = express.Router();


// authentication
router.route('/register').post(userRegister);

router.route('/login').post(userLogin);

router.route('/logout').get(userLogout);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);


// user routes
router.route('/profile').get(isAuthenticated, getProfile);

router.route('/profile/update').put(isAuthenticated, updateUser);

router.route('/profile/password/change').put(isAuthenticated, changePassword);


//admin routes
router.route('/admin/users').get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

router.route('/admin/user/:id')
.get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
.put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
.delete(isAuthenticated, authorizeRoles("admin"), deleteUser);


module.exports = router;