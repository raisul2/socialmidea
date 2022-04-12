const postModel = require('../models/postModel')
const userModel = require('../models/userModel')
const {sendEmail} = require('../middlewares/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')
exports.register = async (req, res) =>{
    try {
        

        const {name, email,password,avater } = req.body
           let user = await userModel.findOne({email})
           if (user) {
               return res.status(400).json({success:false, message: "User already exsit"})
           }

           const myCloude = await cloudinary.v2.uploader.upload(avater,{
               folder: "avtars"
           })
           
           user = await userModel.create({
               name,
               email ,
               password,
               avater:{public_id: myCloude.public_id ,url:myCloude.secure_url}})


               const token = await user.generateToken()

               const options = { expires: new Date(Date.now()+ 90 * 24 * 60 * 60 * 1000),
                  httpOnly: true,}
              
                      res.status(201).cookie("token", token, options).json({
                          success: true,
                          user,
                          token
                      })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.login = async ( req,res ) =>{
    try {
        
        const { email, password} = req.body


        const user = await userModel.findOne({email}).select("+password").populate("posts followers following") 

        if (!user) {
            return res.status(400).json({
                success:false,
                message: "User does not exist"
            })
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success:false, 
                message: "Incorrect Password" 
            })
        }
 


        const token = await user.generateToken()

 const options = { expires: new Date(Date.now()+ 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,}

        res.status(200).cookie("token", token, options).json({
            success: true,
            user,
            token
        })


    } catch (error) {

        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
} 


/// user logout system create 


 exports.logoutUser = async (req, res) =>{
     try {


        res.status(200).cookie("token", null,{expres: new Date(Date.now()), httpOnly: true}).json({
            success: true,
            message: "Logged out succes full"
        }) 

         

     } catch (error) {
         res.status(500).json({
             success: false,
             message: error.message
         })
     }
 }




// crate  a faollowUser  system 


exports.followUser = async (req, res) =>{
    try {
        
    
         const userToFollow = await userModel.findById(req.params.id)


         const  logedInUser = await userModel.findById(req.user._id)

         if (!userToFollow) {
             return res.status(404).json({
                 success:false,
                 message: "User not found"
             })
         }



         if (logedInUser.following.includes(userToFollow._id)) {
            
            const indexfolling = logedInUser.following.indexOf(userToFollow._id)
            const indexfollers = userToFollow.following.indexOf(logedInUser._id)

            logedInUser.following.splice(indexfolling, 1)
            userToFollow.followers.splice(indexfollers, 1)

            await  logedInUser.save()
            await userToFollow.save()

            
            res.status(500).json({
                success: false,
                message: "User Unfollowed"
            })

         }else{
             
             
             
                      logedInUser.following.push(userToFollow._id)
             
                      userToFollow.followers.push(logedInUser._id)
             
                      await logedInUser.save()
                      await userToFollow.save()
             
                      res.status(200).json({
                          success: true,
                          message: "User followed"
                      })

         }







    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


/// updaate password function create 


exports.updatePassword = async (req, res) =>{
    try {
        
        const user = await userModel.findById(req.user._id).select("+password")


        const { oldPassword , newPassword} = req.body

        if (!oldPassword || !newPassword) {
            
            return res.status(400).json({
                success: false,
                message: "Plase provide old and new password"
            })

        }
        

        const isMatch = await user.matchPassword(oldPassword)

        if (!isMatch) {
              return res.status(400).json({
                  success: false,
                  message: "Incorrect old password"
              })
        }

        user.password = newPassword

        await user.save()

        res.status(200).json({
            success: true,
            message: "Password updated"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}     



exports.updateProfail = async (req, res) =>{
    try {

        
        const user = await userModel.findById(req.user._id)

        const { name, email,avater} = req.body

        if (!name || !email ) {
            return res.status(404).json({
                success: false,
                message: "Place enter your data that you want to change"
            })
        } 

        if (name) {
            user.name = name
            
        }
        if (email) {
            user.email = email

        }
        if(avater){
             await cloudinary.v2.uploader.destroy(user.avater.public_id)
             const myCloud = await cloudinary.v2.uploader.upload(avater,{
                 folder:"avatars"
             })

             user.avater.public_id = myCloud.public_id
             user.avater.url = myCloud.secure_url
             
        }

        await user.save()

        res.status(200).json({
            success: true,
            message: " Profail updated successfully "
        })

        
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        })
    }
}



exports.deleteMyprofaile = async (req, res) =>{
    try {
        
        const user = await userModel.findById( req.user._id)

        const posts =  user.posts
        const followers = user.followers
        const following = user.following
        const userId = user._id

       /// removing avater pthothos from cloudnary

       await cloudinary.v2.uploader.destroy(user.avater.public_id)


   await user.remove()

   //' logout user after deletiong user

   res.cookie("token", null,{expres: new Date(Date.now()), httpOnly: true})
 




   /// deletinon all post 
     for (let i = 0; i < posts.length; i++) {
          const post = await postModel.findById(posts[i]) 
          await cloudinary.v2.uploader.upload.destroy(post.image.public_id)

          await post.remove()
            
         
     }


     //remove user from  follower fiekd


     for (let i = 0; i < followers.length; i++) {
         const follower = await userModel.findById(followers[i])
         
         const index = follower.following.indexOf(userId)

         follower.following.splice(index, 1) 

            await  follower.save()
     }

     // removing user form flowing followers

     for (let i = 0; i < following.length; i++) {
         const follows = await userModel.findById(following[i])
         
         const index = follows.followers.indexOf(userId)

         follows.followers.splice(index, 1) 

            await  follows.save()
     }
 
  

     /// removing all comment of the all post
     const allposts = await  postModel.find();

     for (let i = 0; i < allposts.length; i++) {
         const post = await postModel.findById(allposts[i]._id);

         for (let j = 0; j < post.comments.length; j++) {
              if(post.comments[j].user === userId ){
                      post.comments.splice(j,1)
                    }
                    
                }
                
                await post.save()
     }

     /// removing all likes 
     const alllikes = await  postModel.find();

     for (let i = 0; i < alllikes.length; i++) {
         const post = await postModel.findById(alllikes[i]._id);

         for (let j = 0; j < post.likes.length; j++) {
              if(post.likes[j] === userId ){
                      post.likes.splice(j,1)
                    }
                    
                }
                
                await post.save()
     }





   res.status(200).json({  
       success: true,
       message: 'Profaile deleted succesfull'
   })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.myProfaile = async (req, res) =>{
    try {

        const user = await userModel.findById(req.user._id).populate("posts followers following")

        res.status(200).json({
             success: true,
             user
        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}





exports.getUserProfaile = async (req, res) =>{


    try{


        const user = await userModel.findById(req.params.id).populate("posts followers following")


        if (!user) {
            return res.status(404).json({
                success: true,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })


    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}


exports.getAllUser = async  (req, res) =>{
    try{

     const users = await userModel.find({name:{$regex: req.query.name, $options: "i"}})

     res.status(200).json({
         success: true,
         users
     })

         

    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



exports.forgotPassword = async (req, res) =>{
    try{
              
        const user = await userModel.findOne({email:req.body.email})
           
 if (!user) {
    return res.status(404).json({
        success: false,
        message: " User not found"
    })
}

 const resetPasswordToken = user.getResetPasswordToken()

  
 await user.save()


   const resetUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetPasswordToken}`
  

   
   const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`
    
try {
    
    await sendEmail({email: user.email, subject: " Reset Password", message})

    res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} `
    })

} catch (error) {


    user.getResetsPasswordToken = undefined

    user.getResetPasswordExpire = undefined

    await user.save()

    res.status(500).json({
        success: false,
        message: error.message
    })
    
}


    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.resetPassword = async (req, res) =>{
    try{

           const  getResetsPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex")

            const user = await userModel.findOne({
                getResetsPasswordToken,
                getResetPasswordExpire: {$gt: Date.now()}
            })

            if (!user) {
                return res.status(401).json({ 
                    success: false,
                    message: "Token is invalid or has expired"
                })
            }

            user.password = req.body.password

            user.getResetsPasswordToken=undefined
            user.getResetPasswordExpire =  undefined

            await user.save()

            res.status(200).json({
                success: true,
                message: "Password reset succesfull "
            })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



/// get my post



exports.getMyPost = async  (req, res) =>{
    try{

     const user = await userModel.findById(req.user._id)

    const posts = []

    for (let i = 0; i < user.posts.length; i++) {
         const post = await postModel.findById(user.posts[i]).populate("likes comments.user owner")
         posts.push(post)
        
    }


     res.status(200).json({
         success: true,
         posts
     })

         

    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.getusersPost = async  (req, res) =>{
    try{

     const user = await userModel.findById(req.params.id)

    const posts = []

    for (let i = 0; i < user.posts.length; i++) {
         const post = await postModel.findById(user.posts[i]).populate("likes comments.user owner")
         posts.push(post)
        
    }


     res.status(200).json({
         success: true,
         posts
     })

         

    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

