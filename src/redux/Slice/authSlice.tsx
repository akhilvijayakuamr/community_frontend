import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState } from "../../utils/interfaces";


const initialState : authState ={
    user:null,
    error: null,
    email:'',
    login:false,
    token:null,
    admin_token:'',
    reset_email:'',
    allUsers:[],
};

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

        clearError:(state) =>{
            state.error = null;
        },

        setEmail:(state, action: PayloadAction<string>) =>{
            state.email = action.payload;
        },

        setLogin:(state, action: PayloadAction<{user:any}>) =>{
            state.login = true;
            state.allUsers = action.payload.user;
        },

        setToken:(state, action: PayloadAction<string | null>) =>{
            state.token = action.payload;
        },

        userLogout:(state) =>{
            state.user = null;
            state.login = false;
            state.token = null;
            state.error = null;
        },

        adminLogin:(state, action: PayloadAction<{jwt:string}>) =>{
            state.admin_token = action.payload.jwt;
        },

        usersList:(state, action: PayloadAction<any[]>) =>{
            state.allUsers = action.payload;
        },
    },
});

export const {

    setUser,
    setError,
    clearError,
    setEmail,
    setLogin,
    setToken,
    userLogout,
    adminLogin,
    usersList,

} = authSlice.actions;


export default authSlice.reducer;







