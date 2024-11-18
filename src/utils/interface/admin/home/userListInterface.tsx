
// User list response interface

export interface UsersList {
    id: string;
    username: string;
    full_name: string;
    email: string;
    is_active: boolean;
  }


// User block response interface

export interface UserBlockData{
    message: string;
  }