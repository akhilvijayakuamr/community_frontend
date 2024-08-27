import { useState, useEffect } from 'react';
import backgroundImage from '../../../assets/images/mainbackground.jpeg';
import Google from '../../../assets/icons/Google.png';
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import './Mainpage.css'
import { useNavigate } from 'react-router-dom';
import { setEmail, setError } from '../../../redux/Slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store/store';
import { Alert } from '@mui/material';



export default function Mainpage() {


  const [mail, setmail] = useState<string>('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authError = useSelector((state: RootState)=>state.auth.error)


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
  

  function isValidEmail(mail: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(mail);
  }

  const handleSubmit =()=>{
    console.log(mail)
    if (isValidEmail(mail)) {
      dispatch(setEmail(mail))
      dispatch(setError(''))
      navigate('/register')
    } else {
      dispatch(setError('Invalid email address!'))
    }
  }
    


  return (
    <div className="w-full h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${backgroundImage})` }}>

<div className='flex justify-end p-4'>
  <button className="bg-transparent border border-white-<Mainpage/> text-white py-2 px-6 rounded-lg shadow-md hover:bg-opacity-100 border-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
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

        <p className="mt-2 sm:mt-3 md:mt-3 text-base sm:text-lg md:text-2xl md:mb-4 sm:mb-4">   
        Being a developer is tough, but it doesn’t have to be.
        <br/>
         Imagine a personalized feed, a vibrant community, 
         <br/>
         and a better search experience. It’s possible. Let’s make it happen!
        </p>

        <div className='email-input'>
        <input
        type="text"
        value={mail}
        placeholder="Enter email..."
        onChange={(e) => setmail(e.target.value)}
        className=" input-email w-72 bg-gray-900 opacity-80 mt-3 mb-4 border border-transparent rounded-lg w-200 px-5 py-2 placeholder-white placeholder-lar focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <br/>

      { authError&& (
        <Alert variant="filled" severity="error" sx={{ width: '41%'}} >
        {authError}
      </Alert>
      )}

      <button onClick={handleSubmit} className="bg-white mt-2 text-gray-900 border border-gray-400 font-semibold py-2 px-16 rounded shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
        Sign up - Free forever 
      </button>
      
      <h3 className='text-lg mt-2 text-gray-300'>_________or sign up with_________</h3>

      <button className="bg-white mt-2 border border-gray-300 text-gray-800 font-medium py-2 px-14 rounded flex items-center space-x-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        <img src={Google} alt="Google Icon" className="w-6 h-6" />
        <span>Sign in with Google</span>
      </button>

      </div>

      </div>
    
    </div>
  )
}

