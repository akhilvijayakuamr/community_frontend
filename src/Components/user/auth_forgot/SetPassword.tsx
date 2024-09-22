import React, { useState } from 'react'
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import { change } from '../../../redux/Actions/authActions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';




export default function SetPassword() {

    const [password, setPassword ] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const email = useSelector((state: RootState) => state.auth.email);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


    const handleChange =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(password!=confirmPassword){
            toast.error("Password mismatch !!!!")
        }
    
        if (!strongPasswordRegex.test(password)){
            toast.error("Please Eneter Strong Password !!!")
            return
        }
    
        try {
          await dispatch(change(email, password, navigate) as any);
  
        } catch {
          console.log("Login Error")
        }
      }


      return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="w-full max-w-md bg-gray-950 rounded-lg shadow-lg p-6">
        <ToastContainer/>

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
        Change password
      </h2>

     

      <form onSubmit={handleChange}>
        
        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white font-semibold mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="newpassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter  new password"
            className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500   rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
          />
        </div>


        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white font-semibold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="newpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter confirm password"
            className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500   rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
          />
        </div>





        <br />

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-white text-Black py-2 rounded-md font-semibold hover:bg-gray-300 focus:outline-none  focus:ring-offset-2 focus:border-white focus:bg-gray-400"
        >
          Submit
        </button>
      </form>

      {/* Sign In Link */}
      <p className="text-center text-gray-600 mt-4">
      </p>
    </div>
  </div>
  )
}
