
import  axios  from "axios"

export const loginUser = (email, password) => async (dispatch)=>{

    try{

        dispatch({
            type: "LoginRequest"
        })

        const {data} = await axios.post("/api/v1/login", {email, password},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type: "LoginSuccess",
            payload: data.user,
        })


    }catch(error){
        
        dispatch({
            type: "LoginFailure",
            payload:error
        })

    }
       

}

export const registerUser = (name, email, password,avater) => async (dispatch)=>{


    try{

        dispatch({
            type: "RegisterRequest"
        })

        const {data} = await axios.post("/api/v1/register", {name, email, password,avater},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type: "RegisterSuccess",
            payload: data.user,
        })


    }catch(error){
        
        dispatch({
            type: "RegisterFailure",
            payload:error
        })

    }
       

}
export const logoutUser = () => async (dispatch)=>{


    try{

        dispatch({
            type: "LogoutUserRequest"
        })

         await axios.get("/api/v1/logout")

        dispatch({
            type: "LogoutUserSuccess" 

        
        })


    }catch(error){
        
        dispatch({
            type: "LogoutUserSuccess",
            payload:error
        })

    }
       

}



export const loadUser = () => async (dispatch)=>{


    try{

        dispatch({
            type: "LogadUserRequest"
        })

        const {data} = await axios.get("/api/v1/me")


        dispatch({
            type: "LogadUserSuccess",
            payload: data.user,
        })


    }catch(error){
        
        dispatch({
            type: "LogadUserFailure",
            payload:error.response.data.message
        })

    }
       

}



export const getFollowingPosts = () => async (dispatch) =>{

    try {

        dispatch({
            type: "postoffFollowingRequest",
        })
        
        const {data} = await axios.get("/api/v1/posts")

        
        
        dispatch({
            type: "postoffFollowingSucces",
            payload: data.posts
        })

    } catch (error) {
        dispatch({
            type: "postoffFollowingFailure",
            payload:error.response.data.message
        })

        
    }

}
export const getAllusers = (name="") => async (dispatch) =>{

    try {

        dispatch({
            type: "alluserRequest",
        })
        
        const {data} = await axios.get(`/api/v1/users?name=${name}`)

        
        
        dispatch({
            type: "alluserSucces",
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: "alluserFailure",
            payload:error.response.data.message
        })

        
    }

}



export const getmyPosts = () => async (dispatch) =>{

    try {

        dispatch({
            type: "myPostsRequest",
        })
        
        const {data} = await axios.get("/api/v1/my/posts")

        
        
        dispatch({
            type: "myPostsSuccess",
            payload: data.posts   
        })

    } catch (error) {  
        dispatch({
            type: "myPostsFailer",
            payload:error.response.data.message
        })

        
    }

}

export const getUserPosts = (id) => async (dispatch) =>{

    try {

        dispatch({
            type: "userPostsRequest",
        })
        
        const {data} = await axios.get(`/api/v1/userposts/${id}`)

        
        
        dispatch({
            type: "userPostsSuccess",
            payload: data.posts   
        })

    } catch (error) {  
        dispatch({
            type: "userPostsFailer",
            payload:error.response.data.message
        })

        
    }

}


export const getUserProfile = (id) => async (dispatch) =>{

    try {

        dispatch({
            type: "userProfileRequest",
        })
        
        const {data} = await axios.get(`/api/v1/user/${id}`)

        
        
        dispatch({
            type: "userProfileSucces",
            payload: data.user
        }) 

    } catch (error) {  
        dispatch({
            type: "userProfileFailure",
            payload:error.response.data.message
        })

        
    }

}



export const updateProfile = (name, email, avater) => async (dispatch)=>{


    try{

        dispatch({
            type: "updateProfileRequest"
        })

        const {data} = await axios.put("/api/v1/update/profail", {name, email, avater},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type: "updateProfileSuccess",
            payload: data.message,
        })


    }catch(error){
        
        dispatch({
            type: "updateProfileFailure",
            payload:error.response.data.message
        })

    }
       

}

export const updatePassword = (oldPassword, newPassword) => async (dispatch)=>{


    try{

        dispatch({
            type: "updatePasswordRequest"
        })

        const {data} = await axios.put("/api/v1/update/password", {oldPassword, newPassword},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type: "updatePasswordSuccess",
            payload: data.message,
        })

  
    }catch(error){
        
        dispatch({
            type: "updatePasswordFailure",
            payload:error.response.data.message
        })

    }
       

}

export const deletProfile = () => async (dispatch)=>{


    try{

        dispatch({
            type: "deletProfileRequest"
        })

        const {data} = await axios.delete("/api/v1/delet/me")

        dispatch({
            type: "deletProfileSuccess",
            payload: data.message,
        })

  
    }catch(error){
        
        dispatch({
            type: "deletProfileFailure",
            payload:error.response.data.message
        })

    }
       

}

export const forgotPassword = (email) => async (dispatch)=>{


    try{

        dispatch({
            type: "forgotpasswordRequest"
        })

        const {data} = await axios.post("/api/v1/forgot/password",{
            email
        },{
            headers:{
                "Content-Type":"application/json" 
            }
        })

        dispatch({
            type: "forgotpasswordSuccess",
            payload: data.message,
        })

  
    }catch(error){
        
        dispatch({
            type: "forgotpasswordFailure",
            payload:error.response.data.message
        })

    }
       

}

export const recetMyPassword = (token, password) => async (dispatch)=>{


    try{

        dispatch({
            type: "recetpasswordRequest"
        })

        const {data} = await axios.put(`/api/v1/password/reset/${token}`,{
         password
        },{
            headers:{
                "Content-Type":"application/json" 
            }
        })

        dispatch({
            type: "recetpasswordSuccess",
            payload: data.message,
        })

  
    }catch(error){
        
        dispatch({
            type: "recetpasswordFailure",
            payload:error.response.data.message
        })

    }
       

}






export const followAndUnfolloePosts = (id) => async (dispatch) =>{

    try {

        dispatch({
            type: "followuserRequest",
        })
        
        const {data} = await axios.get(`/api/v1/follow/${id}`)

        
        
        dispatch({
            type: "followuserSuccess",
            payload: data.message   
        })

    } catch (error) {  
        dispatch({
            type: "followuserFailure",
            payload:error.response.data.message
        })

        
    }

}