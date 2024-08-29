import React,{useEffect, useState} from 'react'
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import { UseDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setToken, setError } from '../../../redux/Slice/authSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../redux/Store/store';
import { login } from '../../../redux/Actions/authActions';
import { Alert } from '@mui/material';




interface SigninFormData {
    email: string;
    password: string;
  }


export default function Login() {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authError = useSelector((state: RootState) => state.auth.error);
    const token = useSelector((state: RootState) => state.auth.token);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');



    useEffect(() => {
      if (authError) {
        const timer = setTimeout(() => {
          dispatch(setError(''));
        }, 10000); 
        return () => {
          clearTimeout(timer);
        };
      }
    }, [authError, dispatch]);

  
    
     
    
      const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
          await dispatch(login(email,password,navigate) as any);
        }catch{
          console.log("Login Error", authError)
        }
      }
        

      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="w-full max-w-md bg-gray-950 rounded-lg shadow-lg p-6">
          { authError&& (
            <Alert variant="filled" severity="error" sx={{ width: '100%'}} >
              {authError}
            </Alert>
          )}
            
            {/* Logo */}
            <div className="flex justify-center mb-1 ">
              <img
                src={Logo}
                alt="Logo"
                className="size-32 object-contain"
              />
            </div>
    
            {/* Sign Up Form */}
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Sign In
            </h2>
            <form onSubmit={handleLogin}>


                 {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white font-semibold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500   rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
                />
              </div>

    
             
              {/* Password Input */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-white font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500 rounded-md focus:outline-none   placeholder-white text-white focus:border-white focus:bg-slate-800"
                />
              </div>
    

             <br/>
    
              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-white text-Black py-2 rounded-md font-semibold hover:bg-gray-300 focus:outline-none  focus:ring-offset-2 focus:border-white focus:bg-gray-400"
              >
                Sign Up
              </button>
            </form>
    
            {/* Sign In Link */}
            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="#" className="text-blue-500 font-semibold hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      );
}
