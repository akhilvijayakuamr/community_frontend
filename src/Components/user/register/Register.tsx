import React, { useEffect } from 'react'
import { useState } from 'react';
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import { SignupFormData } from '../../../utils/interface/user/signup/signupinterface';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUpAsync } from '../../../redux/Actions/authActions';
import { setEmail } from '../../../redux/Slice/authSlice';
import { RootState } from '../../../redux/Store/store';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';


export default function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prefilledEmail = useSelector((state: RootState) => state.auth.email)

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
        <div className="flex justify-center mb-1 ">
          <img
            src={Logo}
            alt="Logo"
            className="size-32 object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSignup}>

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

          <button
            disabled={isLoading}
            type="submit"
            className={`w-full py-2.5 rounded-lg font-medium text-sm text-white 
        ${isLoading ? "bg-blue-700 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"} 
        focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

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
