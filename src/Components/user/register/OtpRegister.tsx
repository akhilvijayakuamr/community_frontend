import React, { useState } from 'react'
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import { UseDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearError } from '../../../redux/Slice/authSlice';
import { verifyOtpAsync } from '../../../redux/Actions/authActions';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../redux/Store/store';


export default function OtpRegister() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authError = useSelector((state: RootState)=>state.auth.error)
    const email = useSelector((state: RootState)=>state.auth.email)
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);


    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      dispatch(clearError());
      const OTP: string = otp.join('');
      await dispatch(verifyOtpAsync (email, OTP, navigate) as any);
      console.log(OTP)
      console.log(email)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const { value } = e.target;
      if (/^\d*$/.test(value)) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        
  
        // Move focus to the next input if the current one is filled
        if (value.length === 1 && index < otp.length - 1) {
          (document.getElementById(`otp-${index + 1}`) as HTMLInputElement).focus();
        }
      }
    };
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === 'Backspace' && otp[index] === '') {
        if (index > 0) {
          (document.getElementById(`otp-${index - 1}`) as HTMLInputElement).focus();
        }
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="bg-gray-950 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-1 ">
              <img
                src={Logo}
                alt="Logo"
                className="size-32 object-contain"
              />
            </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Enter OTP</h2>
          <p className="mb-6 text-white">Please enter the 6-digit OTP sent to your email.</p>
          <div className="flex space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl text-white bg-slate-900  rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                maxLength={1}
              />
            ))}
          </div>
          <button  onClick={handleVerify}  className="mt-6 w-full bg-white text-black py-2 px-4 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700">
            Submit
          </button>
        </div>
      </div>
    );
}
