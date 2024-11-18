// Signup interface

export interface SignupFormData {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}


// Signup response interface

export interface ApiResponse {
  data: {
    error?: string;
    data?: any;
  };
  status: number;
}