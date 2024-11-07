
// Interface for slice data


export interface authState {
    user: any | null,
    error: string | null,
    email: string,
    login: boolean,
    user_token: string | null,
    admin_token:string | null,
    admin_login:boolean,
    reset_email:string,
    allUsers:any[]
    userId:string,
    message: string | null,
    forgot:boolean,
    recalluser:boolean,
    user_profile:string,
    admin_refresh_token:string | null,
    user_refresh_token:string | null,
}



// User data


export interface UserData {
    name: string;
    email: string;
    password: string;
    
}



export interface UserProfile {
    id: string;
    name: string;
    email: string;
}


export interface ApiResponse {
    data: {
        error?: string;
        data?: any; 
    };
    status: number;
}



export interface SignupFormData {
    username: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }


export interface UsersList {
    id: string;
    username:string;
    full_name:string;
    email:string;
    is_active:boolean;
  }

// All post interface

export interface AllPostData {
  post_id: string,
  user_id: string,
  title:string,
  content:string,
  link:string,
  date:string,
  postimage:any,
  profileimage:any,
  like:boolean,
  like_count:number,
  comment_count:string
  
}


export interface AllPostAdminData {
  post_id: string,
  user_id: string,
  title:string,
  content:string,
  link:string,
  date:string,
  postimage:any,
  profileimage:any,
  is_block:boolean,
  like_count:number,
  comment_count:string,
  is_delete:boolean,
  is_report:boolean,
  reports:any[]
}



export interface ProfileList {
    id:string;
    username:string;
    full_name:string;
    location:string|null;
    bio:string|null;
    dob:string|null;
    profileImage:any;
    coverImage:any;
    follow:boolean,
    followers_count:number,
    following_count:number,
    posts:AllPostData[]

  }




  export interface ProfileListUpdate {
    id:string;
    username:string;
    full_name:string;
    location:string|null;
    bio:string|null;
    dob:string|null;
    profileImage:any;
    coverImage:any;

  }



export interface PostData {
    id:string,
    title:string;
    content:string;
    link:string;
    postImage:any;

  }



export interface PostUpdateData {
    id:string,
    user_id:string,
    title:string;
    content:string;
    link:string;
    postImage:any;

  }






// Unique post interface


export interface UniquePostData {
  post_id:string,
  user_id:string,
  title:string,
  content:string,
  link:string,
  date:string,
  postimage:any,
  profileimage:any,
  bio:string,
  full_name:string,
  username:string,
  like:boolean, 
  like_count:number,
  comment_count:string,
  comments: any[]

}


// Reply Comment interface

export interface ReplyFormData {
  userId:string,
  mentionUserId:string,
  mentionUserFullName:string,
  commentId:string,
  content:string
}


// chat user data

export interface ChatState {
  chatUserId: string; 
  full_name: string;
}



// Notification data


export interface NotificationInterface{
  another_user:number,
  content: string,
  follower:number | null,
  full_name:string,
  id:number,
  post:number | null,
  read:boolean,
  timestamp:string,
  user_profile:string|null
}
