import axios from 'axios'



export const likePost = (id) => async (dispatch) =>{

    try {

        dispatch({
            type: "likeRequest",
        })
        
        const {data} = await axios.get(`/api/v1/post/${id}`)

        
        
        dispatch({
            type: "likeSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "likeFailure",
            payload:error.response.data.message
        })

    
    }

}  

export const commentPost = (id,comment) => async (dispatch) =>{

    try { 

        dispatch({
            type: "commentRequest",
        })
        
        const {data} = await axios.put(`/api/v1/post/comment/${id}`, {comment},{
            headers:{
                "Content-Type":"application/json"
            }
        })

        
        
        dispatch({
            type: "commentSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "commentFailure",
            payload:error.response.data.message
        })

    
    }

}  
export const deletcommentPost = (id,commentId) => async (dispatch) =>{

    try {

        dispatch({
            type: "deletcommentRequest",
        })
        
        const {data} = await axios.delete(`/api/v1/post/comment/${id}`, {data: {commentId}})

        
        
        dispatch({
            type: "deletcommentSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "deletcommentFailure",
            payload:error.response.data.message
        })

    
    }
}  



export const createNewPost = (caption, image) => async (dispatch) =>{

    try {

        dispatch({
            type: "newpostRequest",
        })
        
        
        const {data} = await axios.post(`/api/v1/post/upload`,{
            caption,
            image 
      
            
        },{
        headers: {
            "Content-Type":"application/json"
        }
        })
    
        
        dispatch({
            type: "newpostSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "newpostFailure",
            payload:error.response.data.message
        })

    
    }

}  




export const updatePost = (caption, id) => async (dispatch) =>{

    try {

        dispatch({
            type: "updatecaptionRequest",
        })
        
        
        const {data} = await axios.put(`/api/v1/post/${id}`,{
            caption,
     
      
            
        },{
        headers: {
            "Content-Type":"application/json"
        }
        })
    
        
        dispatch({
            type: "updatecaptionSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "updatecaptionFailure",
            payload:error.response.data.message
        })

    
    }

}  


export const deletPost = (id) => async (dispatch) =>{

    try {

        dispatch({
            type: "deletPostRequest",
        })
        
        
        const {data} = await axios.delete(`/api/v1/post/${id}`)
    
        
        dispatch({
            type: "deletPostSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({  
            type: "deletPostFailure",
            payload:error.response.data.message
        })

    
    }

}  



