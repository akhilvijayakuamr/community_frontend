import React, { useEffect } from 'react'
import { useState } from 'react';
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import { SignupFormData } from '../../../utils/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpAsync } from '../../../redux/Actions/authActions';
import { setEmail } from '../../../redux/Slice/authSlice';
import { RootState } from '../../../redux/Store/store';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


export default function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prefilledEmail = useSelector((state: RootState) => state.auth.email)
  const authError = useSelector((state: RootState) => state.auth.error);

  const [SignupFormData, setSignupFormData] = useState<SignupFormData>({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  // Auto fill email


  useEffect(() => {
    if (prefilledEmail) {
      setSignupFormData((prevData) => ({
        ...prevData,
        email: prefilledEmail,
      }));
    }
  }, [prefilledEmail]);



  //  Sign up Action

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(signUpAsync(SignupFormData, navigate) as any);
      dispatch(setEmail(SignupFormData.email));
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  // User view


  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-950 rounded-lg shadow-lg p-6">

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
          Sign Up
        </h2>
        <form onSubmit={handleSignup}>


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
              value={SignupFormData.email}
              onChange={(e) => setSignupFormData({ ...SignupFormData, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500   rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
            />
          </div>

          {/* Username Input */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-white font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={SignupFormData.username}
              onChange={(e) => setSignupFormData({ ...SignupFormData, username: e.target.value })}
              placeholder="Enter your username"
              className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500 rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
            />
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-white font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={SignupFormData.name}
              onChange={(e) => setSignupFormData({ ...SignupFormData, name: e.target.value })}
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500 rounded-md focus:outline-none   placeholder-white text-white focus:border-white focus:bg-slate-800"
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
              value={SignupFormData.password}
              onChange={(e) => setSignupFormData({ ...SignupFormData, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500 rounded-md focus:outline-none   placeholder-white text-white focus:border-white focus:bg-slate-800"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-white font-semibold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={SignupFormData.confirmPassword}
              onChange={(e) => setSignupFormData({ ...SignupFormData, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500 rounded-md focus:outline-none   placeholder-white text-white focus:border-white focus:bg-slate-800"
            />
          </div>

          <div>
            <h6 className='mb-3 text-white'>Your email will be used to send you product and community updates</h6>
          </div>

          <div>


          </div>

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
          <Link to='/user_login' className="text-blue-500 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
