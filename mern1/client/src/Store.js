import {configureStore} from '@reduxjs/toolkit'
import { likeReducer, myPostsReducer, userPostsReducer } from './reducers/Postreducer'
import { userReducer , postoffFollowingReducer, alluserReducer, userProfileReducer } from './reducers/Userreducer'



const store = configureStore( {
    reducer:{
        user: userReducer,
        postoffFolling : postoffFollowingReducer,
        allusers:alluserReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userProfile: userProfileReducer,
        userPost: userPostsReducer
    }
})
 
export default store