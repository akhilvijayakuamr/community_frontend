// Admin all post interface

export interface AllPostAdminData {
    post_id: string,
    user_id: string,
    title: string,
    content: string,
    link: string,
    date: string,
    postimage: any,
    profileimage: any,
    is_block: boolean,
    like_count: number,
    comment_count: string,
    is_delete: boolean,
    is_report: boolean,
    reports: any[]
  }