


import React, { useEffect,  useState } from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import {Row, Col,Button} from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { getUserPosts, getUserProfile,followAndUnfolloePosts, loadUser} from '../actions/Useraction'

import Lodings  from './Lodings'
import { useParams} from 'react-router-dom'
import User from './User'
 
import Post from './Post'
const UserProfile = () => {
 
    const dispatch = useDispatch()
    const params =  useParams()
 
    const {user, loading:userLoading, error:userError} = useSelector((state)=>state.userProfile)
    const {user:me,} = useSelector((state)=>state.user)
    const {loading, error, posts} = useSelector((state)=> state.userPost)
    
    const {error:followError, message, loading:followLoading} = useSelector((state)=> state.like)

    const [follewersToggle, setFollewersToggle] = useState(false)
    const [follewingToggle, setFollewingToggle] = useState(false)
    const [following, setFollowing] = useState(false)
    const [myProfile, setMyProfile] = useState(false)

 

     useEffect(() => {
       
       dispatch(getUserPosts(params.id))
       dispatch(getUserProfile(params.id))
     

   

     }, [dispatch, params.id])
  

     useEffect(() => {
       
      if (user) {

        if(me._id === params.id){
          setMyProfile(true)
      }
        user.followers.forEach((item)=>{
             if(item._id === me._id){
               setFollowing(true)
             }
        })  
      }else{
        setFollowing(false)
      }


         


 
      
     }, [user, me._id, params.id])
     



     const followhandler = async() =>{
         setFollowing(!following)
        await dispatch(followAndUnfolloePosts(user._id))
        dispatch(getUserProfile(params.id))
        
     }

     

  useEffect(() => {
 
         if(error){
           alert(error)
           dispatch({type:"clearErrors"})
           
         }
         if(followError){
           alert(followError)
           dispatch({type:"clearErrors"})

         }
         if(userError){
           alert(userError)
           dispatch({type:"clearErrors"})

         }
         if(message){
           alert(message)
           dispatch({type:"clearMessage"})

         }

        

    
  },  [dispatch, error,message,followError ,userError])
  
     




      


    return (
       
           loading === true || userLoading === true ? (<Lodings/>) :(
            <div className=' main-home'>
            <Row>
              <Col md={9} sm={12} className="home-left account-l">
              <Swiper className="  mySwiper home-left h-100 "
    direction={"vertical"}
    slidesPerView={"auto"}
    freeMode={true}
    scrollbar={true}
    mousewheel={true}
    modules={[FreeMode, Scrollbar, Mousewheel]}
  >
    <SwiperSlide>
              
              {
                     posts && posts.length> 0 ? posts.map(post=>(
                        <Post
                        key={post._id}
                        postImage={post.image.url}
                        ownerImage={post.owner.avater.url}
                    
                
            
                        postId={post._id}
                        caption={post.caption}
                         
                        likes={post.likes}
                         comments={post.comments}
                          
                           ownerName={post.owner.name}
                            ownerId={post.owner._id}
                            
                           
                        />
                     )) : <h1>No posts to show </h1>
                 }
                 </SwiperSlide>
                 </Swiper>
                 </Col>
              <Col md={3} sm={12} className="home-right account-r" >

           {
               user && (<>
                <div className="box-account">
                <div className="avter-circle">
                <img src={user.avater.url} alt="" />
                </div>
      
                <h1 className="account-name">
                {user.name}
                </h1>
                <div className="box-2">
            
                <div className='follwers'>
                <Button onClick={()=> setFollewersToggle(!follewersToggle) }>
                Follwers
                </Button>
                <p>{user.followers.length}</p>
                </div>
  
                <div className='follwers'>
                <Button onClick={()=> setFollewingToggle(!follewingToggle)}>
                Follwing
                </Button>
                <p>{user.following.length}</p>
                </div>
  
                <div className='follwers'>
                <Button>
               Posts
                </Button>
                <p>{user.posts.length}</p>
                </div>
  
                </div>
  
               <div className="box-3">
              
               {
                   myProfile? null :  (<Button   disabled={followLoading} style={{background:following?"red":""}} onClick={followhandler} >{
                       following? "Unfollow" : "Follow"
                   }</Button>)
               }
               
               </div>
               </div>
                </>)
           }

             {
              follewersToggle ? ( <div  onMouseLeave={()=> setFollewersToggle(!follewersToggle)}  className="dailoglikebox">
              <div className="diologbok">
                 <div className="likes-title">

                 {
                   user && user.followers.length > 0 ? (user.followers.map((follower)=>(
                    <User
                    key={follower._id}
                       userId={follower._id}
                       name={follower.name}
                       avater={follower.avater.url}
                    />
                   ))
                   ):(
                     <h1>You Have no followers</h1>
                   )
                 }

               
                     
                 </div>
              </div>
        
        </div>
   ):(null)
            }

             {
             follewingToggle ? ( <div  onMouseLeave={()=> setFollewingToggle(!follewingToggle)}  className="dailoglikebox">
              <div className="diologbok">
                 <div className="likes-title">

                 {
                   user && user.following.length > 0 ? (user.following.map((Follw)=>(
                    <User
                    key={Follw._id}
                       userId={Follw._id}
                       name={Follw.name}
                       avater={Follw.avater.url}
                    />
                   ))
                   ):(
                     <h1>You Have no followers</h1>
                   )
                 }

               
                     
                 </div>
              </div>
        
        </div>
   ):(null)
            }
              
              </Col>
            </Row>
              
          </div>
           )
       

       
  )
}

export default UserProfile