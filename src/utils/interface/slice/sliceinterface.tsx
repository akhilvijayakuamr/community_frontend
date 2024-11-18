// Interface for slice data


export interface authState {
    user: any | null,
    error: string | null,
    email: string,
    login: boolean,
    user_token: string | null,
    admin_token: string | null,
    admin_login: boolean,
    reset_email: string,
    allUsers: any[]
    userId: string,
    message: string | null,
    forgot: boolean,
    user_profile: string,
    recalluser: boolean,
    user_refresh_token: string | null,
    admin_refresh_token: string | null
  }

