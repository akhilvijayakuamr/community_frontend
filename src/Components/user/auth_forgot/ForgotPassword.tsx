import React, { useState } from 'react'
import Logo from '../../../assets/images/AssureTech_transparent-.png'


export default function ForgotPassword() {

    const [email, setEmail] = useState<string>('');

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="w-full max-w-md bg-gray-950 rounded-lg shadow-lg p-6">
            
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
              Reset password
            </h2>

            <h6 className='text-white mb-10'>Enter the email address you registered with and we will send you a verification code.</h6>

            <form>


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
                  value=''
                //   onChange=''
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500   rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
                />
              </div>

    
            
    

             <br/>
    
              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-white text-Black py-2 rounded-md font-semibold hover:bg-gray-300 focus:outline-none  focus:ring-offset-2 focus:border-white focus:bg-gray-400"
              >
                Send verification code
              </button>
            </form>
    
            {/* Sign In Link */}
            <p className="text-center text-gray-600 mt-4">
              
              <a href="#" className="text-blue-500 font-semibold hover:underline">
                Back to sign In
              </a>
            </p>
          </div>
        </div>
      );
}
