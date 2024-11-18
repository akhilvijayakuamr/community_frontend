import { signUpApi, verifyOtp, loginApi, adminLoginApi, resendApi, googleApi, forgotEmail, changePassword, refresh } from "../../Api/api";
import { clearError, setEmail, setError, setUserLogin, adminLogin, setForgot, resetToken, userLogout } from "../Slice/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { SignupFormData, ApiResponse } from "../../utils/interface/user/signup/signupinterface";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";





// Signup Action

export const signUpAsync = (SignupFormData: SignupFormData, navigate: (path: string) => void) =>
    async (dispatch: Dispatch) => {
        try {
            const response: ApiResponse = await signUpApi(SignupFormData);
            if (response.status >= 200 && response.status < 300) {
                toast.success("Check your email for varification !!!")
                navigate('/otp_register')
            } else {
                toast.error("Unexpected error occurred")
                dispatch(setError("Unexpected error occurred"))
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.error)
                dispatch(setError(error.response.data?.error || "Unknown error occurred"))
                toast.error(error.response.data?.error || "Unknown error occurred")
            } else {
                dispatch(setError("Unexpected error occurred"))
            }
        }
    };



// OTP Verification Action

export const verifyOtpAsync = (email: string, otp: string, navigate: (path: string) => void) =>

    async (dispatch: Dispatch) => {
        try {
            const response = await verifyOtp(email, otp)
            if (response.status == 201) {
                navigate('/user_login')
            } else {
                dispatch(setError(response.data.error));
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.error)
                dispatch(setError(error.response.data?.error || "Unknown error occurred"))
            } else {
                dispatch(setError("Unexpected error occurred"))
            }
        }
    };



// Resend OTP Action

export const resendOTP = (email: string) =>
    async (dispatch: Dispatch) => {
        console.log(email)
        try {
            const response = await resendApi(email)
            if (response.status != 200) {
                dispatch(setError(response.data.error));
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.error)
                dispatch(setError(error.response.data?.error || "Unknown error occurred"))
            } else {
                dispatch(setError("Unexpected error occurred"))
            }
        }
    }



// User Login Action


export const login = (email: string, password: string, navigate: (path: string) => void) =>

    async (dispatch: Dispatch) => {
        dispatch(setError(''))
        try {
            const response = await loginApi(email, password)

            if (response.status == 200) {
                dispatch(setUserLogin(response.data))
                dispatch(clearError())
                toast.success("Login Successfully")
                navigate('/Home')
            } else {
                dispatch(setError("Invalid details"))
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log("error response: ", error.response);
                console.log("error response data: ", error.response.data?.error);
                setError(error.response.data?.error)
                dispatch(setError(error.response.data?.error || "Unknown error occurred"))
                toast.error(error.response.data?.error || "Unknown error occurred")
                dispatch(setEmail(email))
            } else {
                dispatch(setError("Unexpected error occurred"))
                dispatch(setEmail(email))
            }
        }
    }




// Google Login Action


export const googlelogin = (email: string, fullname: string, navigate: (path: string) => void) =>

    async (dispatch: Dispatch) => {
        dispatch(setError(''))
        try {
            const response = await googleApi(email, fullname)

            if (response.status == 200) {
                dispatch(setUserLogin(response.data))
                dispatch(clearError())
                navigate('/Home')
            } else {
                dispatch(setError("Invalid details"))
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.error)
                toast.error(error.response.data?.error || "Unknown error occurred")
                dispatch(setError(error.response.data?.error || "Unknown error occurred"))
                dispatch(setEmail(email))
            } else {
                dispatch(setError("Unexpected error occurred"))
                dispatch(setEmail(email))
            }
        }
    }



// Admin Login Action

export const adminlogin = (email: string, password: string, navigate: (path: string) => void) =>
    async (dispatch: Dispatch) => {
        dispatch(setError(''))
        try {
            const response = await adminLoginApi(email, password)
            if (response.status == 200) {
                dispatch(adminLogin(response.data))
                navigate('/dashboard')
                dispatch(clearError())
            } else {
                dispatch(setError("Invalid details"))
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.error)
                toast.error(error.response.data?.error || "Unknown error occurred")
                dispatch(setError(error.response.data?.error || "Unknown error occurred"))
            } else {
                dispatch(setError("Unexpecte129130d error occurred"))
            }
        }
    }


// Forgote Email

export const ForgoteEmail = (email: string, navigate: (path: string) => void) =>
    async (dispatch: Dispatch) => {
        try {
            console.log(email)
            const response: ApiResponse = await forgotEmail(email);
            if (response.status >= 200 && response.status < 300) {
                dispatch(setForgot())
                toast.success("Check your email for varification !!!")
                navigate('/otp_register')
            } else {
                toast.error("Unexpected error occurred")
                dispatch(setError("Unexpected error occurred"))
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data?.error)
                dispatch(setError(error.response.data?.error || "Unknown error occurred"))
                toast.error(error.response.data?.error || "Unknown error occurred")
            } else {
                dispatch(setError("Unexpected error occurred"))
            }
        }
    };




// Change Password


export const change = (email: string, password: string, navigate: (path: string) => void) =>

    async (dispatch: Dispatch) => {
        dispatch(setError(''))
        try {
            const response = await changePassword(email, password)
            if (response.status == 201) {
                toast.success("Password  Changed Successfully")
                navigate('/user_login')
            } else {
                dispatch(setError("Invalid details"))
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log("error response: ", error.response);
                console.log("error response data: ", error.response.data?.error);
                setError(error.response.data?.error)
                dispatch(setError(error.response.data?.error || "Unknown error occurred"))
                toast.error(error.response.data?.error || "Unknown error occurred")
                dispatch(setEmail(email))
            } else {
                dispatch(setError("Unexpected error occurred"))
                dispatch(setEmail(email))
            }
        }
    }



// Access Token

export const getAccessToken = async (userRefreshToken: string | null, dispatch: any, navigate: any) => {
    if (!userRefreshToken) {
        console.error("No refresh token found.");
        return;
    }

    const refreshHeaders = {
        Authorization: `Bearer ${userRefreshToken}`,
        'Content-Type': 'application/json',
    };

    try {
        const token: AxiosResponse<any> = await refresh(refreshHeaders);
        dispatch(resetToken(token.data));
        return token.data.access_token;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            dispatch(userLogout());
            navigate('/user_login');
        } else {
            console.error("Failed to refresh token:", error);
        }
    }
};