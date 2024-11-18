// All post interface

export interface AllPostData {
    post_id: string,
    user_id: string,
    title: string,
    content: string,
    link: string,
    date: string,
    postimage: any,
    profileimage: any,
    like: boolean,
    like_count: number,
    comment_count: string
  
}


  
// Profile update interface
  
export interface ProfileListUpdate {
    id: string;
    username: string;
    full_name: string;
    location: string | null;
    bio: string | null;
    dob: string | null;
    profileImage: any;
    coverImage: any;
  
  }


// friends not fields interface

export interface friends {
    full_name: string,
    id: number,
    user_profile: string|null,
    username: string
  }



// Unique post data

export interface UniquePostInterface{
    "bio": string,
    "coverImage": string | null,
    "dob":string,
    "follow":boolean,
    "followers_count":number,
    "following_count":number,
    "full_name":string,
    "id":string,
    "location":string,
    "posts":AllPostData[]
    "profileImage":string,
    "username":string
}


// Followers and following interface


export interface FollowerFollowingInterface{
    follower:friends[],
    followed:friends[]
}