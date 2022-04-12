import {createReducer} from '@reduxjs/toolkit'

const initialstate = {}

export const likeReducer = createReducer(initialstate, {

     likeRequest: (state) => {
         state.loading = true
     },
     likeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload

     },
     likeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
     },
     commentRequest: (state) => {
         state.loading = true
     },
     commentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload

     },
     commentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
     },
     deletcommentRequest: (state) => {
         state.loading = true
     },
     deletcommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload

     },
     deletcommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
     },


     cleaerErrors: (state) => {
         state.error = null
     },
   
     cleaerMessage: (state) => {
         state.message = null
     }, 


    newpostRequest: (state) => {
      state.loading = true
  },
 newpostSuccess: (state, action) => {
     state.loading = false;
     state.message = action.payload

  },
 newpostFailure: (state, action) => {
     state.loading = false;
     state.error = action.payload
  },
   updatecaptionRequest: (state) => {
      state.loading = true
  },
updatecaptionSuccess: (state, action) => {
     state.loading = false;
     state.message = action.payload

  },
updatecaptionFailure: (state, action) => {
     state.loading = false;
     state.error = action.payload
  },
     
       
   deletPostRequest: (state) => {
      state.loading = true
  },
deletPostSuccess: (state, action) => {
     state.loading = false;
     state.message = action.payload

  },
deletPostFailure: (state, action) => {
     state.loading = false;
     state.error = action.payload
  },
     
       
   updateProfileRequest: (state) => {
      state.loading = true
  },
updateProfileSuccess: (state, action) => {
     state.loading = false;
     state.message = action.payload

  },
updateProfileFailure: (state, action) => {
     state.loading = false;
     state.error = action.payload
  },

   updatePasswordRequest: (state) => {
      state.loading = true
  },
updatePasswordSuccess: (state, action) => {
     state.loading = false;
     state.message = action.payload

  },
updatePasswordFailure: (state, action) => {
     state.loading = false;
     state.error = action.payload
  },
     

   deletProfileRequest: (state) => {
      state.loading = true
  },
deletProfileSuccess: (state, action) => {
     state.loading = false;
     state.message = action.payload

  },
deletProfileFailure: (state, action) => {
     state.loading = false;
     state.error = action.payload
  },
     
   forgotpasswordRequest: (state) => {
      state.loading = true
  },
forgotpasswordSuccess: (state, action) => {
     state.loading = false;
     state.message = action.payload

  },
forgotpasswordFailure: (state, action) => {
     state.loading = false;
     state.error = action.payload
  },

   followuserRequest: (state) => {
      state.loading = true
  },
followuserSuccess: (state, action) => {
     state.loading = false;
     state.message = action.payload

  },
followuserFailure: (state, action) => {
     state.loading = false;
     state.error = action.payload
  },



     
   recetpasswordRequest: (state) => {
      state.loading = true
  },
recetpasswordSuccess: (state, action) => {
     state.loading = false;
     state.message = action.payload

  },
recetpasswordFailure: (state, action) => {
     state.loading = false;
     state.error = action.payload
  },
     
       
       

}) 


export const myPostsReducer = createReducer(initialstate,{

   myPostsRequest : (state) =>{
       state.loading= true
   },
   myPostsSuccess : (state, action) =>{
      state.loading = false;
      state.posts = action.payload
   },
   myPostsFailer : (state, action) =>{
      state.loading= false;
      state.error = action.payload
   },
   myPostsErrors : (state) =>{
      state.error = null
   },

})

export const userPostsReducer = createReducer(initialstate,{

   userPostsRequest : (state) =>{
       state.loading= true
   },
   userPostsSuccess : (state, action) =>{
      state.loading = false;
      state.posts = action.payload
   },
   userPostsFailer : (state, action) =>{
      state.loading= false;
      state.error = action.payload
   },
   userPostsErrors : (state) =>{
      state.error = null  
   },

})