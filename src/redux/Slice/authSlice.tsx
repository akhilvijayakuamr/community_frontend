import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState } from "../../utils/interface/slice/sliceinterface";


// Initialize all state

const initialState : authState ={
    user:null,
    error: null,
    email:'',
    login:false,
    user_token:null,
    admin_token:null,
    admin_login:false,
    reset_email:'',
    allUsers:[],
    userId:'',
    message:null,
    forgot:false,
    user_profile:'',
    recalluser:false,
    user_refresh_token:null,
    admin_refresh_token:null,

};


// Create auth slice

const authSlice = createSlice({
    name:'auth',
    initialState,

    reducers:{


        setUser:(state, action: PayloadAction<any>) =>{
            state.user = action.payload;
            state.login = true;
            state.error = null;
        },


        setError:(state, action: PayloadAction<string>) =>{
            state.error = action.payload;
        },


        setForgot:(state) =>{
            state.forgot = true
        },


        setOutForgot:(state)=>{
            state.forgot = false
        },


        setMessage:(state, action: PayloadAction<string>) =>{
            state.message = action.payload;
        },


        clearError:(state) =>{
            state.error = null;
        },


        setEmail:(state, action: PayloadAction<string>) =>{
            state.email = action.payload;
        },


        setUserLogin:(state, action: PayloadAction<{user:any, access_token:string, refresh_token:string, id:string, profile_image:string}>) =>{
            state.login = true;
            state.allUsers = action.payload.user;
            state.user_token = action.payload.access_token;
            state.user_refresh_token = action.payload.refresh_token;
            state.userId = action.payload.id;
            state.user_profile = action.payload.profile_image;
        },


        resetToken: (state, action: PayloadAction<{access_token:string, refresh_token:string}>) =>{
            state.user_token = action.payload.access_token;
            state.user_refresh_token = action.payload.refresh_token;
        },


        setToken:(state, action: PayloadAction<string | null>) =>{
            state.user_token = action.payload;
        },


        userLogout:(state) =>{
            state.user = null;
            state.login = false;
            state.user_token = null;
            state.user_refresh_token = null,
            state.error = null;
        },


        adminLogin:(state, action: PayloadAction<{access_token:string, refresh_token:string}>) =>{
            state.admin_login = true;
            state.admin_token = action.payload.access_token;
            state.admin_refresh_token = action.payload.refresh_token;
        },


        usersList:(state, action: PayloadAction<any[]>) =>{
            state.allUsers = action.payload;
        },


        adminLogout:(state) =>{
            state.admin_login = false;
            state.admin_token = null;
            state.error = null;
            state.admin_refresh_token = null;
        },


        recall:(state) =>{
            state.recalluser = !state.recalluser
        }

    },
});

export const {

    setUser,
    setError,
    clearError,
    setEmail,
    setUserLogin,
    setToken,
    userLogout,
    adminLogin,
    usersList,
    adminLogout,
    setMessage,
    setForgot, 
    setOutForgot,
    recall,
    resetToken

} = authSlice.actions;


export default authSlice.reducer;







