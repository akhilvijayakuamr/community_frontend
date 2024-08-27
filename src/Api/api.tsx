import { SignupFormData } from "../utils/interfaces";
import { UserProfile } from "../utils/interfaces";
export const BASE_URL= 'http://localhost:8000/'
import axios, {AxiosResponse} from "axios";

export const signUpApi = (SignupFormData: SignupFormData): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/register/`, SignupFormData);

export const verifyOtp = (email: string, otp: string): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/verify_otp/`, { email, otp });

export const loginApi = (email: string, password: string): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/user_login/`, { email, password });

export const adminLoginApi = (email: string, password: string): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/users/admin_login/`, { email, password });

export const userProfileApi = (userId: string): Promise<AxiosResponse<UserProfile>> =>
    axios.get(`${BASE_URL}/userdata/${userId}`);

export const logoutApi = (): Promise<AxiosResponse<any>> =>
    axios.post(`${BASE_URL}/logout/`);


