const express = require('express');


const { register, login, followUser, logoutUser, updatePassword, updateProfail, deleteMyprofaile, myProfaile, getUserProfaile,  getAllUser, forgotPassword, resetPassword, getMyPost, getusersPost } = require('../controlers/userControl');
const { isAuthenticated} = require('../middlewares/auth')

const router = express.Router();

router.route("/register").post(register) 
router.route("/login").post(login)
router.route("/logout").get(logoutUser)
router.route("/follow/:id").get(isAuthenticated, followUser)
router.route("/update/password").put(isAuthenticated, updatePassword)
router.route("/update/profail").put(isAuthenticated, updateProfail)
router.route("/delet/me").delete(isAuthenticated, deleteMyprofaile )
router.route("/me").get(isAuthenticated, myProfaile )
router.route("/my/posts").get(isAuthenticated, getMyPost)
router.route("/userposts/:id").get(isAuthenticated,  getusersPost)
router.route("/user/:id").get(isAuthenticated, getUserProfaile )
router.route("/users").get(isAuthenticated, getAllUser )
router.route("/forgot/password").post( forgotPassword )
router.route("/password/reset/:token").put( resetPassword )

 
 
     
 


 
module.exports = router