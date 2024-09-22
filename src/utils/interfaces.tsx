
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
    user_profile:string,
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



export interface ProfileList {
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
  like:boolean
  
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
  comments: any[]

}


