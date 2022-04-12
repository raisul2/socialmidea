import {createReducer} from '@reduxjs/toolkit'

const initialstate  ={
    isAuthenticated: false
}

export const userReducer = createReducer(initialstate, {

    // loging casee
    
    LoginRequest: (state) =>{

        state.loading = true
    },
    LoginSuccess: (state, action) =>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
        
    },
    LoginFailure: (state, action) =>{
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    },
    //register case
    RegisterRequest: (state) =>{
        state.loading = true
    },
    RegisterSuccess: (state, action) =>{
        state.loading = false;
        state.user = action.payload
        state.isAuthenticated = true
    },
    RegisterFailure: (state, action) =>{
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
    },
    
    //loading user case
    LogadUserRequest : (state) => {
        state.loading = true
    },
    LogadUserSuccess : (state, action) => {
        state.loading = false;
        state.user = action.payload
        state.isAuthenticated = true
    },
    LogadUserFailure : (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated =  false
    },
    LogoutUserRequest : (state) => {
        state.loading = true
    },
    LogoutUserSuccess : (state) => {
        state.loading = false;
        state.user =  null
        state.isAuthenticated = false
    },
    LogoutUserFailure : (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = true
    },

    clearErrors : (state) => {
        state.error = null
    }

})


export const postoffFollowingReducer = createReducer(initialstate, {

       postoffFollowingRequest: (state) => {
        state.loading = true
        

       },
       postoffFollowingSucces: (state, action) => {
        state.loading = false;
        state.posts = action.payload
       },
       postoffFollowingFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
       },

       clearErrors : (state) => {
           state.error = null
       }

})

export const  userProfileReducer = createReducer(initialstate, {

     userProfileRequest: (state) => {
        state.loading = true
        

       },
     userProfileSucces: (state, action) => {
        state.loading = false;
        state.user = action.payload
       },
     userProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
       },

       clearErrors : (state) => {
           state.error = null
       }

})



export const  alluserReducer = createReducer(initialstate, {

       alluserRequest: (state) => {
        state.loading = true
        

       },
       alluserSucces: (state, action) => {
        state.loading = false;
        state.users = action.payload
       },
       alluserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
       },

       clearErrors : (state) => {
           state.error = null
       }

})