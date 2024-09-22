import { ProfileList, SignupFormData } from "../utils/interfaces";
export const BASE_URL= 'http://localhost:8000/'
import axios, {AxiosResponse} from "axios";
import { UsersList, PostData  } from "../utils/interfaces";


// Signup api


export const signUpApi = (SignupFormData: SignupFormData): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/register/`, SignupFormData);


// OTP verify api


export const verifyOtp = (email: string, otp: string): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/verify_otp/`, { email, otp });


// Resend OTP api


export const resendApi = (email: string): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/resend_otp/`, { email });


// Login api


export const loginApi = (email: string, password: string): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/user_login/`, { email, password });


// Google auth api


export const googleApi = (email: string, fullname: string): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/user_google/`, { email, fullname });


// Admin login api


export const adminLoginApi = (email: string, password: string): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/admin_login/`, { email, password });


// User list api



export const userListApi = (headers: { [key: string]: string }): Promise<AxiosResponse<UsersList[]>> => {
    return axios.get<UsersList[]>(`${BASE_URL}/users/user_list/`, { headers });
  }


// User block and unblock api



export const AdminBlockUnblock = (userId:string, headers: { [key: string]: string }): Promise<AxiosResponse<any>> =>{
    return axios.post(`${BASE_URL}/users/block_unblock_user/`,{userId}, {headers})
}


// Profile data api



export const UserData= (userId:string, headers: { [key: string]: string }): Promise<AxiosResponse<any>> =>{
    return axios.post(`${BASE_URL}/users/profile/`,{userId}, {headers})
}


// User profile update api



export const UserUpdate= (ProfileList: ProfileList,  headers: { [key: string]: string }): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/userprofileupdate/`, ProfileList,{headers})



// PostCreate Api



export const PostCreate= (PostData: PostData, headers: { [key:string]:string}): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/post/create_post/`, PostData, {headers});



// Forgot password enter email




export const forgotEmail = (email:string): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/forgotemail/`, {email});



// Forgot change password



export const changePassword = (email:string, password:string): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/change_password/`,{email, password})


// Display all posts


export const postListApi = (userId:string, headers:{[key:string]:string}): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/post/post_list/`,{userId}, {headers});



// Get unique post


export const postGetApi = (postId:string, userId:string,  headers:{[key:string]:string}): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/post/get_post/`, {postId, userId}, {headers})



// Like Post



export const postLikeApi = (postId:string, userId:string, headers:{[key:string]:string}): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/post/like/`, {postId, userId}, {headers})



// Comment Post



export const postCommentApi = (postId:string, userId:string, content:string, headers:{[key:string]:string}): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/post/comment/`, {postId, userId, content}, {headers} )


