import { ProfileList, SignupFormData, ProfileListUpdate, PostUpdateData } from "../utils/interfaces";
export const BASE_URL= 'http://localhost:8000'
export const SOCKET_BASE_URL= 'http://localhost:8001/'
import axios, {Axios, AxiosResponse} from "axios";
import { UsersList, PostData, ReplyFormData  } from "../utils/interfaces";


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



export const UserData= (userId:string, profileId:string, headers: { [key: string]: string }): Promise<AxiosResponse<any>> =>{
    return axios.post(`${BASE_URL}/users/profile/`,{userId, profileId}, {headers})
}


// User profile update api



export const UserUpdate= (ProfileList: ProfileListUpdate,  headers: { [key: string]: string }): Promise<AxiosResponse<any>> =>
    axios.put(`${BASE_URL}/users/userprofileupdate/`, ProfileList,{headers})



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




// Replay Post


export const postReplayComment = (ReplayFormData: ReplyFormData, headers: { [key: string]: string }): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/post/comment_replay/`, ReplayFormData, {headers})




// Following User


export const userFollow = (userId:string, followUserId:string, headers:{[key:string]: string}): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/follow/`, {userId, followUserId}, {headers})



// Update post


export const PostUpdate= (PostList: PostUpdateData,  headers: { [key: string]: string }): Promise<AxiosResponse<any>> =>
    axios.put(`${BASE_URL}/post/userpostupdate/`, PostList,{headers})


// Comment delete


export const CommentDelete = (commentId: string, headers: { [key: string]: string }): Promise<AxiosResponse<any>> => 
    axios.delete(`${BASE_URL}/post/delete_comment/`, {
        data: { commentId },
        headers
    });



// Replay Delete

export const replyDelete = (replyId: string, headers: { [key: string]: string }): Promise<AxiosResponse<any>> => 
    axios.delete(`${BASE_URL}/post/delete_reply/`, {
        data: { replyId },
        headers
    });



// Post Delete

export const postDelete = (postId: string, headers: {[key: string]: string}): Promise<AxiosResponse<any>> =>
    axios.delete(`${BASE_URL}/post/post_delete/`,{
        data: {postId},
        headers
    })


// Post Report


export const postReport = (postId:string, reportUserId:string, report:string, headers: {[key: string]: string}): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/post/post_report/`,{postId, reportUserId, report}, {headers})


// Display all post admin

export const postAdminiListApi = (headers: {[key: string]: string}): Promise<AxiosResponse<any>> =>
    axios.get(`${BASE_URL}/post/admin_post_list/`, {headers});



// Post Hide

export const postHide = (postId: string, headers: {[key: string]: string}): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/post/post_hide/`,{postId}, {headers})



// Get all chat 


export const getChatList = (userId: string, chatUserId: string, headers: { [key: string]: string }): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/communication/chat_list/`, {userId,chatUserId}, headers)




// Get chat user list


export const getUserChat = (userId:string, headers: { [key: string]: string }): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/communication/chat_user/`, {userId}, headers)



// Search user


export const searchUser = (query:string, userId:string, headers: {[key:string]: string}): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/search/`, {query, userId}, headers)



// Take all notification

 
export const getNotification = (userId:string, headers: {[key:string]: string}): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/communication/get_notification/`, {userId}, headers)


// Read all notification

export const readNotification = (userId:string, headers: {[key:string]: string}): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/communication/read_notification/`, {userId}, headers)






