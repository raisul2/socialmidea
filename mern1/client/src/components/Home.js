import React , { useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar, Mousewheel } from "swiper";
import {useDispatch, useSelector} from 'react-redux'
import { getAllusers, getFollowingPosts } from '../actions/Useraction';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import User from './User';
import Post from './Post';
import Lodings from './Lodings';



const Home = () => {

    
    const dispatch = useDispatch()
    const { loading ,  posts ,  error } = useSelector(
        (state)=>state.postoffFolling
        )

    const {users, loading:usersLoading} = useSelector((state)=> state.allusers)

    useEffect(() => {
      
dispatch( getFollowingPosts())
dispatch(getAllusers())
    
    
    }, [dispatch])
    

  return (
<>

   { loading === true || usersLoading === true ? (<Lodings/>) : (

    <div className="main-home">
    <Row className=' h-100'>
    <Col md={9} sm={12} className="home-left h-100">
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
        posts && posts.length > 0 ? posts.map((post)=>(

            <Post
            key={post._id}
            postImage={post.image.url}
            ownerImage={post.owner.avater.url}
            

            postId={post._id}
            caption={post.caption}
            // postImage={post.image.url}
            likes={post.likes}
             comments={post.comments}
            //   ownerImage={post.owner.profileImage}
               ownerName={post.owner.name}
                ownerId={post.owner._id}
           
            />
        )): <h1>No posts yeat</h1>
    }

       

        </SwiperSlide>
        </Swiper>
    </Col>
 
    <Swiper className="home-right  h-100 col-md-3"
    direction={"vertical"}
    slidesPerView={"auto"}
    freeMode={true}
    scrollbar={true}
    mousewheel={true}
    modules={[FreeMode, Scrollbar, Mousewheel]}
  >
    <SwiperSlide>


    {
        users && users.length > 0 ? users.map((user) =>((

            <User
            key={user._id}
               userId={user._id}
               name={user.name}
               avater={user.avater.url}
            />
            
        ))):<h1>No Users Yet</h1>
    }


   
      


    </SwiperSlide>
    </Swiper>
   
    
    </Row>
    </div>
    )}
    </>
    )
}

export default Home