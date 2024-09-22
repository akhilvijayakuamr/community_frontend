import { useState, useEffect } from 'react';
import backgroundImage from '../../../assets/images/mainbackground.jpeg'
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import { googlelogin, login } from '../../../redux/Actions/authActions';
import './Mainpage.css'
import { useNavigate } from 'react-router-dom';
import { setEmail, setError } from '../../../redux/Slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store/store';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { CredentialResponse } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Mainpage() {


  const [mail, setmail] = useState<string>('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authError = useSelector((state: RootState) => state.auth.error)
  const Login = useSelector((state: RootState) => state.auth.login)



  // Auto delete error check user is already login

  useEffect(() => {

    if (Login) {
      navigate('/Home')
    } else {
      if (authError) {
        const timer = setTimeout(() => {
          dispatch(setError(''));
        }, 10000)
        return () => {
          clearTimeout(timer);
        };
      }
    }

  }, [authError, dispatch]);


  // Validate Email

  function isValidEmail(mail: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(mail);
  }


  // Set Email and redirect register



  const handleSubmit = () => {
    if (isValidEmail(mail)) {
      dispatch(setEmail(mail))
      dispatch(setError(''))
      navigate('/register')
    } else {
      toast.error('Invalid email address!')
    }
  }


  // Redirect Login

  const handleLogin = () => {
    navigate('/user_login')
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

  }



  // This is my view

  return (
    <div className="w-full h-screen bg-cover bg-center min-h-screen "
      style={{ backgroundImage: `url(${backgroundImage})` }}>

      <ToastContainer />

      <div className='flex justify-end p-4'>
        <button onClick={handleLogin} className="bg-transparent border border-white-<Mainpage/> text-white py-2 px-6 rounded-lg shadow-md hover:bg-opacity-100 border-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Login
        </button>
      </div>

      <div
        className="absolute text-white sm:left-4 sm:top-2 md:left-8 md:top-6 lg:left-12 lg:top-10 xl:left-16 xl:top-8"
        style={{ left: '50px', top: '20px' }}
      >


        <div className='logo' >
          <img src={Logo} alt="Logo" className="size-36" />
        </div>


        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Where developers share </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">the through hardships</span>
        </h1>

        <p className="mt-4 sm:mt-4 md:mt-4 text-base sm:text-lg md:text-2xl md:mb-4 sm:mb-4">
          Being a developer is tough, but it doesn’t have to be.
          <br />
          Imagine a personalized feed, a vibrant community,
          <br />
          and a better search experience. It’s possible. Let’s make it happen!
        </p>

        <div className='email-input  '>
          <input
            type="text"
            value={mail}
            placeholder="Enter email..."
            onChange={(e) => setmail(e.target.value)}
            className=" input-email w-72 bg-gray-900 opacity-80 mt-3 mb-4 border border-transparent rounded-lg w-200 px-5 py-2 placeholder-white placeholder-lar focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <br />



          <button onClick={handleSubmit} className="bg-white mt-2 text-gray-900 border border-gray-400 font-semibold py-2 px-16 rounded shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            Sign Up
          </button>

          <h3 className='text-lg mt-5 text-gray-300'>___or sign up with___</h3>

          <br />

          {/* Google login component */}

          <GoogleLogin
            onSuccess={handleSuccess}
          />

        

        </div>

      </div>
    </div>
    
  )
}

