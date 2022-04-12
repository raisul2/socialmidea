import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletcommentPost } from '../actions/PostAction'
import { getFollowingPosts, getmyPosts } from '../actions/Useraction'

const CommentCard = ({
    userId,
    name,
    avater,
    comment,
    commentId,
    postId,
    isAccount
}) => {

    const { user} = useSelector((state)=> state.user)

     const dispatch = useDispatch()


    const deletCommetnhandal =() =>{

           console.log('delet')
           dispatch(deletcommentPost(postId, commentId))

           if(isAccount){
              dispatch(getmyPosts())
                 }else{
                   
                   dispatch( getFollowingPosts())
                 }

    }


  return (
    <div className='comment-user'>
      <Link to={`/user/${userId}`} className='box' >
      <div className="img-div">
      <img src={avater} alt="" />
      </div>
      <h1 className="comment-name">{name}</h1>
      </Link>
      <p className="maincomment">{comment}</p>

      {
            isAccount ? 
            (<Button onClick={deletCommetnhandal}>
            <i class="fa-solid fa-circle-xmark"></i>
            </Button>): userId === user._id? (
                <Button onClick={deletCommetnhandal}>
                <i class="fa-solid fa-circle-xmark"></i>
                </Button>
            ): null

      }

    </div>
  )
}

export default CommentCard