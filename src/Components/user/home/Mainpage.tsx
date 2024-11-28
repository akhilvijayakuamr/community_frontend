import { useState, useEffect } from 'react';
import backgroundImage from '../../../assets/images/img1.jpeg';
import Logo from '../../../assets/images/AssureTech_transparent-.png';
import { googlelogin } from '../../../redux/Actions/authActions';
import './Mainpage.css';
import { useNavigate } from 'react-router-dom';
import { setEmail, setError } from '../../../redux/Slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store/store';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { CredentialResponse } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Mainpage() {
  const [mail, setmail] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.auth.error);
  const Login = useSelector((state: RootState) => state.auth.login);

  // Auto delete error check user is already login
  useEffect(() => {
    if (Login) {
      navigate('/Home');
    } else if (authError) {
      const timer = setTimeout(() => {
        dispatch(setError(''));
      }, 10000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [authError, Login, dispatch, navigate]);

  // Validate Email
  const isValidEmail = (mail: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);

  // Set Email and redirect to register
  const handleSubmit = () => {
    if (isValidEmail(mail)) {
      dispatch(setEmail(mail));
      dispatch(setError(''));
      navigate('/register');
    } else {
      toast.error('Invalid email address!');
    }
  };

  // Redirect to Login
  const handleLogin = () => {
    navigate('/user_login');
  };

  // Google Login
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode<any>(credentialResponse.credential);
      try {
        await dispatch(googlelogin(decoded.email, decoded.name, navigate) as any);
      } catch {
        console.log('Login Error', authError);
      }
    } else {
      console.log('No credential received');
    }
  };

  // View
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})`, filter: 'brightness(90%)' }}
    >
      <ToastContainer />

      {/* Header */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleLogin}
          className="bg-transparent border text-white py-2 px-6 rounded-lg shadow-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Login
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-white p-4">
        {/* Logo */}
        <div className="logo mb-4">
          <img src={Logo} alt="Logo" className="h-16 md:h-14" />
        </div>

        {/* Headline */}
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            Where developers share
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            through hardships
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-center text-sm sm:text-base lg:text-lg max-w-prose">
          Being a developer is tough, but it doesn’t have to be.
          <br />
          Imagine a personalized feed, a vibrant community,
          <br />
          and a better search experience. It’s possible. Let’s make it happen!
        </p>

        {/* Form */}
        <div className="email-input mt-5 w-full max-w-sm flex flex-col items-center">
          <input
            type="text"
            value={mail}
            placeholder="Enter email..."
            onChange={(e) => setmail(e.target.value)}
            className="w-full bg-gray-900 opacity-80 border border-transparent rounded-lg px-5 py-2 placeholder-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-white mt-4 text-gray-900 border border-gray-400 font-semibold py-2 rounded shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>

          {/* Divider */}
          <h3 className="text-lg mt-5 text-gray-300 text-center">___or sign up with___</h3>

          {/* Google Login */}
          <div className="w-full mt-4 flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              containerProps={{
                className: "w-full flex justify-center",
              }}
            />
          </div>
        </div>
      </div>
    </div>

  );
}
