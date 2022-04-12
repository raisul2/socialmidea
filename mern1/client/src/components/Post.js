import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { commentPost, deletPost, likePost, updatePost } from '../actions/PostAction'
import { getFollowingPosts, getmyPosts,  loadUser } from '../actions/Useraction'
import CommentCard from './CommentCard'
import User from './User'

const Post = ({postId, caption,postImage,likes=[], comments=[], ownerImage, ownerName, ownerId,
isDelet = false,
isAccount = false
}) => {


  const [like, setLike] = useState(false)
  const {error, message} = useSelector((state) => state.like) 
  const { user} = useSelector((state)=> state.user)
  const [likesuser, setLikesuser] = useState(false)
  const [commentValue, setCommentValue] = useState("")
  const [commentToggle, setCommentToggle] = useState(false)
  const [captionValue, setcaptionValue] = useState(caption)
  const [captionToggle, setcaptionToggle] = useState(false)
const  dispatch = useDispatch()



  const handleLike = async () =>{
      setLike(!like)
     await  dispatch(likePost(postId))
     
     if(isAccount){
      dispatch(getmyPosts())
     }else{
       
       dispatch( getFollowingPosts())
    }
   
     


    
    

      // if (error) {
      //   window.alert(error)
      //   dispatch({type:" cleaerErrors"})
      // }
      // if (message) {
        
      //   dispatch({type: "cleaerMessage"})
      // }
   
      
  } 

  const addcommenthandeler =  async(e)=>{
   
     e.preventDefault()
      await dispatch(commentPost(postId,commentValue))

      if(isAccount){
          dispatch(getmyPosts())
             }else{
               
               dispatch( getFollowingPosts())
             }

  }

 useEffect(() => {
  likes.forEach((item) => {
       
    if(item._id ===  user._id){
      setLike(true)
    }
});

 }, [likes, user._id])
 


 const updatecaptionhandeler =(e) =>{
   e.preventDefault()
   dispatch(updatePost(captionValue,  postId))
   dispatch(getmyPosts())
  }
  
  const deletposthandler = async() =>{
   await dispatch(deletPost(postId))
    dispatch(getmyPosts())
    dispatch(loadUser())
  
}

  return (
    <>
    <div className='main-post' >
   
       <div className="post-header">
       {
           isAccount ? <button  onClick={ ()=>  setcaptionToggle(!captionToggle)} className='bg-transparent menu-btn'><i class="fa-solid fa-ellipsis-vertical"></i></button> : null
       }
       </div>
         <div className="post-img">
          <img src={postImage} alt="Post" />
         </div>

         <div className="post-details">
           <div className="owner-img">
             <img src={ownerImage} alt="User"  />
           </div>
           <Link  className=' nav-link' to={`/user/${ownerId}`}>
              <h1 className=' owner-name'>{ownerName}</h1>
           </Link>
           <h1 className="caption">{caption}</h1>
         </div>
         <p className="post-like">
          <button onClick={()=>setLikesuser(!likesuser)} 
           disabled={likes.length === 0 ? true : false}
          className=' border-0 bg-transparent'> {likes.length} likes</button>
         </p>

         <div className="post-footer">
           <button onClick={handleLike} >{like?  <i className="fa-solid fa-heart" style={{color:"red"}}></i> : <i class="fa-regular fa-heart"></i>}</button>

           <button onClick={()=>setCommentToggle(!commentToggle)}  ><i   className="fa-regular fa-comment"></i></button>  

           {
               
               isDelet? <button onClick={ deletposthandler} > <i class="fa-regular fa-trash-can"></i> </button>  : null
           } 
          

         </div>

         {
           likesuser ? ( <div onMouseLeave={()=>setLikesuser(!likesuser)}   className="dailoglikebox">
           <div className="diologbok">
              <div className="likes-title">
                {
                
                   likes.map(like=>(
                    <User
                    key={like._id}
                       userId={like._id}
                       name={like.name}
                       avater={like.avater.url}
                    />
                   ))
                  }
                  
              </div> 
           </div>
     
     </div>
):(null)
         }


         
         {
          captionToggle ? ( <div onMouseLeave={()=> setcaptionToggle(!captionToggle)} className="dailoglikebox">
          <div className="diologbok">
             <div className="likes-title">

             <Form onSubmit={updatecaptionhandeler}>
             <Form.Control type="text" value={captionValue}
               onChange={(e)=> setcaptionValue(e.target.value)}
               placeholder="caption here...."
               required
             >
             
             </Form.Control>
             
             <Button type="submit" >update</Button>
             </Form>
              
                  
                 
             </div>
          </div>
    
    </div>
          ):(null)
        }




         {
           commentToggle ? ( <div onMouseLeave={()=> setCommentToggle(!commentToggle)} className="dailoglikebox">
           <div className="diologbok">
              <div className="likes-title">

              <Form onSubmit={addcommenthandeler}>
              <Form.Control type="text" value={commentValue}
                onChange={(e)=> setCommentValue(e.target.value)}
                placeholder="comment here...."
                required
              >
              
              </Form.Control>
              
              <Button type="submit" >Add</Button>
              </Form>
               
                    {
                       comments.length > 0 ? comments.map(item =>{
                         return(
                           <>
                           <CommentCard
                           userId={item.user._id}
                        name={item.user.name}
                        avater={item.user.avater.url}
                        comment={item.comment}
                        commentId={item._id}
                        key={item._id}
                        postId={postId}
                        isAccount={isAccount}
                        />
                        </>
                        )
                       }) : <h1>no comments yet</h1>
                    }
                  
              </div>
           </div>
     
     </div>
           ):(null)
         }

        
          

       </div>
      </>
  )
}

export default Post