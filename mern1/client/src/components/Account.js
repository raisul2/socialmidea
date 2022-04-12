import React, { useEffect,  useState } from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import {Row, Col,Button} from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import {deletProfile, getmyPosts} from '../actions/Useraction'
import {logoutUser} from '../actions/Useraction'
import Lodings  from './Lodings'
import {Link} from 'react-router-dom'
import User from './User'


import Post from './Post'
const Account = () => {
 
    const dispatch = useDispatch()
 
    const {user, loading:userLoading} = useSelector((state)=>state.user)
    const {loading, error, posts} = useSelector((state)=> state.myPosts)
    
    const {error:likeError, message, loading:deleteLoading} = useSelector((state)=> state.like)

    const [follewersToggle, setFollewersToggle] = useState(false)
    const [follewingToggle, setFollewingToggle] = useState(false)

    const logoutHandler = async ()=>{
          
      await dispatch(logoutUser())
       alert("log out succesfully")        

    }


     useEffect(() => {
       
       dispatch(getmyPosts())

     }, [dispatch])
  

     const deletMyProfile = async() =>{

        await dispatch(deletProfile())
         dispatch(logoutUser())

     }

     
     




      


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
                            isAccount={true}
                            isDelet={true}
                       
                        />
                     )) : <h1>No posts to show </h1>
                 }
                 </SwiperSlide>
                 </Swiper>
                 </Col>
              <Col md={3} sm={12} className="home-right account-r" >

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
             <Button onClick={logoutHandler} >Logout</Button>
             
             <Link className=' nav-link' to="/update/profile">Edit Profile</Link>
             <Link className=' nav-link' to="/update/password">Change Password</Link>
             <Button  disabled={deleteLoading} onClick={deletMyProfile} className=" bg-danger">Delet my profile</Button>
             </div>
             </div>

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

export default Account