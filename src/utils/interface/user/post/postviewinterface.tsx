// Reply data interface


export interface ReplyData{
    "content": string,
    "date":string,
    "full_name":string,
    "mention_user":string,
    "mention_user_id":number,
    "replay_id":number,
    "user_id":number,
    "user_profile":string
}


// Comment data interface


export interface CommentData{
    "comment_id":number,
    "content":string,
    "date":string,
    "full_name":string,
    "replies":ReplyData[]
    "reply_count":number,
    "user_id":number,
    "user_profile":string
}



// Unique post data interface


export interface UniquePostData {
    post_id: string,
    user_id: string,
    title: string,
    content: string,
    link: string,
    date: string,
    postimage: any,
    profileimage: any,
    bio: string,
    full_name: string,
    username: string,
    like: boolean,
    like_count: number,
    comment_count: number,
    comments: CommentData[]
  }



// Post update data interface


export interface PostUpdateData {
    id: string,
    user_id: string,
    title: string;
    content: string;
    link: string;
    postImage: any;
  
  }


// Reply Comment interface

export interface ReplyFormData {
    userId: string,
    mentionUserId: string,
    mentionUserFullName: string,
    commentId: string,
    content: string
  }



// Create post data interface

export interface PostData {
  id: string,
  title: string;
  content: string;
  link: string;
  postImage: any;

}