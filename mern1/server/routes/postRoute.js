const express = require('express');
const { createPost, likeUnlikePost, deletPost, getPostOffollwoing, updateCaption, addComent, deletComment } = require('../controlers/postControl');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/post/upload').post( isAuthenticated, createPost)
router.route('/post/:id').get( isAuthenticated,likeUnlikePost ).delete(isAuthenticated,deletPost).put(isAuthenticated, updateCaption)
router.route('/posts').get( isAuthenticated, getPostOffollwoing )
router.route('/post/comment/:id').put( isAuthenticated, addComent ).delete(isAuthenticated, deletComment)
   
 
 
module.exports = router
