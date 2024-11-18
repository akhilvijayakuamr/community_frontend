import React, { useState, useEffect } from 'react'
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import { useNavigate } from 'react-router-dom';
import { clearError, setOutForgot } from '../../../redux/Slice/authSlice';
import { resendOTP } from '../../../redux/Actions/authActions';
import { useDispatch } from 'react-redux';
import { setError } from '../../../redux/Slice/authSlice';
import { RootState } from '../../../redux/Store/store';
import { ToastContainer, toast } from 'react-toastify';
import { verifyOtp } from '../../../Api/api';
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';


export default function OtpRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.auth.error)
  const email = useSelector((state: RootState) => state.auth.email)
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [reTime, setReTime] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const forgot = useSelector((state: RootState) => state.auth.forgot)


  // Auto delete Error

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


  // Resend Otp Time


  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (!canResend) {
      intervalId = setInterval(() => {
        setReTime((prevTime) => (prevTime === 0 ? 0 : prevTime - 1));
        if (reTime === 0) {
          setCanResend(true);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [canResend, reTime]);



  // OTP verification


  const handleVerify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(clearError());
    const OTP: string = otp.join('');
    try {
      const response: AxiosResponse<any> = await verifyOtp(email, OTP);
      if (response.status == 201) {
        if (forgot) {
          dispatch(setOutForgot())
          navigate('/changepassword')
        } else {
          navigate('/user_login')
        }
      }
    } catch {
      toast.error("Updation is not successfull")
    }
  }


  // Resend OTP

  const sendOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(resendOTP(email) as any);
      setReTime(60);
      setCanResend(false);
    } catch (error) {
      console.error("Resend error:", error);
    }
  }


  // Mearge OTP numbers

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto Change front
      if (value.length === 1 && index < otp.length - 1) {
        (document.getElementById(`otp-${index + 1}`) as HTMLInputElement).focus();
      }
    }
  };


  // Auto Change back

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        (document.getElementById(`otp-${index - 1}`) as HTMLInputElement).focus();
      }
    }
  };

  // User view

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-gray-950 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <ToastContainer />

        <div className="flex justify-center mb-1">
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

        <button
          onClick={handleVerify}
          className="mt-6 w-full bg-white text-black py-2 px-4 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
        >
          Submit
        </button>

        <div className="mt-4 text-white text-center">
          {!canResend ? (
            <p>Resend OTP in {reTime}s</p> // Display countdown timer
          ) : (
            <p>You can resend the OTP now.</p>
          )}
        </div>

        {canResend && (
          <button
            onClick={sendOTP}
            className="mt-6 w-full bg-red-600 text-black py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
}
