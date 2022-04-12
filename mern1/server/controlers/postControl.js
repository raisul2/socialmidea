const { json } = require("express/lib/response")
const postModel = require("../models/postModel")
const userModel = require('../models/userModel')
const cloudinary = require('cloudinary')

/// create post function 

exports.createPost = async ( req, res) => {


    
    try { 
     
        const myCloude = await cloudinary.v2.uploader.upload(req.body.image,{
            folder:"posts"
        })

        

      const newPostData ={
    
        caption: req.body.caption,
        image:{
            public_id:myCloude.public_id,
            url:myCloude.secure_url
        },


        owner: req.user._id


      }

      const post = await postModel.create(newPostData)


      const user = await userModel.findById(req.user._id)

      user.posts.unshift(post._id)

await user.save()

      res.status(201).json({
          success:true,
          message:"Post created",
          
      })


       
      
  } catch (error) {
      res.status(500).json({
          success:false,
          message: error.message
      })
  }

}

// delet post function


exports.deletPost = async ( req, res) =>{
    try {

       const post = await postModel.findById(req.params.id);


        if(!post){
            return res.status(404).json({
                success:false,
                message:"Post not found"
            })
        }

        if (post.owner.toString() !== req.user._id.toString() ) {
             return res.status(401).json({
                 success: false,
                 message:"Unauthorized"
             })

        }

        await cloudinary.v2.uploader.destroy(post.image.public_id)

        await post.remove()


        const user = await userModel.findById(req.user._id)

        const index = user.posts.indexOf(req.params.id)
        
        user.posts.splice(index, 1)

        await user.save()

        res.status(200).json({
            success:true,
            message: "Post deleted"
        })

        
        
    } catch (error) {
        res.status(500).json({
            success:false,
             message: error.message
        })
    }
}






// like and unlike function


exports.likeUnlikePost = async ( req, res) =>{
    try {
        
        const post = await postModel.findById(req.params.id)

        if (!post) {
            return   res.status(404).json({
                success:false,
                message: "Post not found"
            })
        }



        if (post.likes.includes(req.user._id)) {
            
            const index = post.likes.indexOf(req.user._id)

            post.likes.splice(index, 1)
            await post.save()

            res.status(200).json({
                success:true,
                message: "Post unliked"
            })

        }



        else{
            
            
                    post.likes.push(req.user._id)
            
                    await post.save()

                    return  res.status(200).json({
                        success:true,
                        message: "Post Liked"
                    });
        }

    } catch (error) {
        
        res.status(500).json({
            success:false,
            message: error.message
        })

    }
}


exports.getPostOffollwoing = async ( req, res) =>{


    try {


        // const user  = await userModel.findById(req.user._id).populate("following", "posts") 
        const user  = await userModel.findById(req.user._id) 
        
        

        const posts = await postModel.find({
            owner: {
                $in: user.following
            }
        }).populate("owner likes comments.user")

         res.status(200).json({
             success: true,
             posts: posts.reverse()
         })
   

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}



exports.updateCaption = async (req, res) =>{
    try {
        
        const post = await postModel.findById(req.params.id)

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

         if (post.owner.toString() !== req.user._id.toString()  ) {
              return res.status(404).json({
                  success: false,
                  message: " Unauthorized"
              })
         }


         post.caption = req.body.caption

         await post.save()

         res.status(200).json({
             success: true,
             message: " Post updateed"
         })


    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}



exports.addComent = async (req, res ) =>{

    try{

          const post = await postModel.findById(req.params.id)

          if (!post) {
               return res.status(404).json({
                   success: false,
                   message: "Post not found"
               })
          }

          let commentsIndex = -1

          post.comments.forEach((item, index) => {
                
            if (item.user.toString() === req.user._id.toString()) {
                commentsIndex = index ;

              
            }
          

          });

         if (commentsIndex !== -1 ) {
            
            post.comments[commentsIndex].comment = req.body.comment

            await post.save()

            return res.status(200).json({
                success: true,
                message: "Comment updated "
            })
                 

         } else {
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            })

            await post.save()
            return res.status(200).json({
                success: true,
                message: "Comment added"
            })
         }



    }catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }

}



 exports.deletComment = async ( req, res) =>{

try{

       const post = await postModel.findById(req.params.id)
       
       if (!post) {
           return res.status(404).json({
               success: false,
               message: "Post are not found"
            })
        } 
        
        
      if ( post.owner.toString() === req.user._id.toString()) {

        if (req.body.commentId == undefined) {
            return res.status(400).json({
                success: false,
                message: "Comment id is required" 
            })
        }

        post.comments.forEach((item, index) => {
                
            if (item._id.toString() === req.body.commentId.toString()) {
                
               return post.comments.splice(index, 1)
   
            }
          
          });
     

        await post.save()


      return  res.status(200).json({
                    success: true,
                    message: "Selected Comment has deleted"
        })
          
      }else{
 

        post.comments.forEach((item, index) => {
                
            if (item.user.toString() === req.user._id.toString()) {
                
               return post.comments.splice(index, 1)
 
            }
          }); 
 
          

          
          
          await post.save()
          
        
          return  res.status(200).json({
            success: true,
            message: "Your  Comment has deleted"
       })
      }


}catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }

 }  