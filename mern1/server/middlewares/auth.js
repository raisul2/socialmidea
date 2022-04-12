const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

 exports.isAuthenticated = async(req, res, next)=> {


    try {
        
        
    const {token} = req.cookies

    if (!token) {
          return res.sattus(401).json({
              message:"Please login first"
          })
    }
    
    const decoded = await  jwt.verify(token, process.env.JWT_SECKEY)


   req.user = await userModel.findById(decoded._id) 
  
  
     next()

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


 }