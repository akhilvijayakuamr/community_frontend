export interface authState {
    user:any | null,
    error: string | null,
    email: string,
    login: boolean,
    token: string | null,
    admin_token:string,
    reset_email:string,
    allUsers:any[]
}


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

export interface RootStates {
    auth: {
      error: string | null;
    };
  }