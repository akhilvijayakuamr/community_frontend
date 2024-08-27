import { signUpApi, verifyOtp, loginApi, adminLoginApi } from "../../Api/api";
import { clearError, setEmail, setError, setLogin, setUser, adminLogin } from "../Slice/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { ApiResponse, SignupFormData } from "../../utils/interfaces";
import axios from "axios";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../Store/store";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, any>;

export const signUpAsync = (SignupFormData:SignupFormData, navigate: (path:string) => void) =>
    async (dispatch: Dispatch) =>{
        try{
            const response: ApiResponse = await signUpApi(SignupFormData);
            if(response.status >= 200 && response.status <300){
                console.log(response.data)
                dispatch(setUser(response.data.data))
                navigate('/otp_register')
            }else{
                dispatch(setError("Unexpected error occurred"))
            }
        }catch (error) {
            if (axios.isAxiosError(error) && error.response){
                console.log("error response: ", error.response);
                console.log("error response data: ", error.response.data?.error);
                setError(error.response.data?.error)
                dispatch(setError(error.response.data?.error || "Unknown error occurred"))
            }else{
                dispatch(setError("Unexpected error occurred"))
            }
        }
    };



export const verifyOtpAsync = (email:string, otp:string, navigate: (path:string) => void) =>
    async (dispatch:Dispatch) =>{
        try{
            const response = await verifyOtp(email, otp)
            console.log("Api response: ", response)

            if(response.status == 201){
                dispatch(setUser(response.data.user))
                navigate('/user_login')
            }else{
                dispatch(setError(response.data.error)); 
            }
        }catch(error){
            if (axios.isAxiosError(error) && error.response){
                console.log("error response: ", error.response);
                console.log("error response data: ", error.response.data?.error);
                setError(error.response.data?.error)
                dispatch(setError(error.response.data?.error || "Unknown error occurred"))
            }else{
                dispatch(setError("Unexpected error occurred"))
            }
        }
    };



export const login = (email:string, password:string, navigate: (path:string)=> void) =>
    async (dispatch:Dispatch)=>{
        dispatch(setError(''))
        try{
            const response = await loginApi(email, password)
            console.log(response)
            if(response.status == 200){
                dispatch(setLogin(response.data))
                console.log("userID: ",response.data.id)
                console.log("JWT: ", response.data.token)
                localStorage.setItem('user_token',response.data.token)
                localStorage.setItem('userId', response.data.id)
                localStorage.setItem('CurrentUser', JSON.stringify(response.data))
                dispatch(clearError())
            }else{
                dispatch(setError("Invalid details"))
                
            }
        }catch (error) {
            if (axios.isAxiosError(error) && error.response){
                console.log("error response: ", error.response);
                console.log("error response data: ", error.response.data?.error);
                setError(error.response.data?.error)
                dispatch(setError(error.response.data?.error || "Unknown error occurred"))
                dispatch(setEmail(email))
            }else{
                dispatch(setError("Unexpected error occurred"))
                dispatch(setEmail(email))
            }
        }
    }



    export const adminlogin = (email:string, password:string, navigate: (path:string)=> void) =>
        async (dispatch:Dispatch)=>{
            dispatch(setError(''))
            try{
                const response = await adminLoginApi(email, password)
                console.log(response)
                if(response.status == 200){
                    dispatch(adminLogin(response.data))
                    console.log("AdminID: ",response.data.id)
                    console.log("JWT: ", response.data.token)
                    localStorage.setItem('admin_token',response.data.token)
                    navigate('/main')
                    dispatch(clearError())
                }else{
                    dispatch(setError("Invalid details"))
                }
            }catch(error){
                if (axios.isAxiosError(error) && error.response){
                    console.log("error response: ", error.response);
                    console.log("error response data: ", error.response.data?.error);
                    setError(error.response.data?.error)
                    dispatch(setError(error.response.data?.error || "Unknown error occurred"))
                }else{
                    dispatch(setError("Unexpected error occurred"))
                }
            }
           
                

        }
