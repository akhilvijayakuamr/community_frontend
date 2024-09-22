import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setError } from '../../../redux/Slice/authSlice';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../redux/Store/store';
import { login, googlelogin } from '../../../redux/Actions/authActions';
import { jwtDecode } from "jwt-decode";
import { CredentialResponse } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';






export default function Login() {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);
  const Login = useSelector((state: RootState) => state.auth.login)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');



  // Check already login and auto delete error


  useEffect(() => {

    if (Login) {
      navigate('/Home')
    }
    else {
      if (authError) {
        const timer = setTimeout(() => {
          dispatch(setError(''))
        }, 10000);
        return () => {
          clearTimeout(timer);
        };
      }
    }

  }, [authError, dispatch]);



  // User Login


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(login(email, password, navigate) as any);
    } catch {
      console.log("Login Error", authError)
    }
  }


  // Google Login 


  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode<any>(credentialResponse.credential);
      try {
        await dispatch(googlelogin(decoded.email, decoded.name, navigate) as any);

      } catch {
        console.log("Login Error", authError)
      }
    } else {
      console.log('No credential received');
    }

  };


  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-950 rounded-lg shadow-lg p-6 items-center">
        <ToastContainer />

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
          <div className="mb-3">
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
          <div className='text-right'>
          <Link className='text-blue-800 text-right' to='/forgot' >forgot password?</Link>z
          </div>
          

          <br />


          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-white text-Black py-2 rounded-md font-semibold hover:bg-gray-300 focus:outline-none  focus:ring-offset-2 focus:border-white focus:bg-gray-400"
          >
            Sign In
          </button>
        </form>



        <br />


        <div className='ml-20'>
          <GoogleLogin
            onSuccess={handleSuccess}
          />;
        </div>




        {/* Sign In Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to='/register' className="text-blue-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
