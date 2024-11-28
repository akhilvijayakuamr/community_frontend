import React,{useState, useEffect} from 'react'
import backgroundImage from '../../../assets/images/pleaseLogin.jpeg'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { adminlogin } from '../../../redux/Actions/authActions';
import { RootState } from '../../../redux/Store/store';
import { setError } from '../../../redux/Slice/authSlice';



export default function AdminLogin() {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const authError = useSelector((state: RootState) => state.auth.error);
    const Login = useSelector((state: RootState) => state.auth.admin_login)


  // Check user is login or not

   useEffect(() => {
    if (Login) {
        navigate('/dashboard')
    }
  }, [])


  // Remove error

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

  
    // Admin login

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
          await dispatch(adminlogin(email,password,navigate) as any);
        }catch{
          console.log("Login Error", authError)
        }
      }
   

    return (
        <div className="w-full h-screen bg-cover bg-center min-h-screen flex items-center justify-center "
        style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="bg-gray-500 bg-opacity-30 p-8 rounded-lg  w-full max-w-md shadow-2xl hover:bg-opacity-50">
            <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
    
    
            <form onSubmit={handleLogin}>
            
              <div className="mb-4">
                <label htmlFor="email" className="block text-black mb-2">
                  Email:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
    
              <div className="mb-4">
                <label htmlFor="password" className="block text-black mb-2">
                  Password:
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className='mb-4'>
                { authError&& (
                  <p className='text-red-700'>{authError}</p>
                )}
    
              </div>
              
              <button
                type="submit"
                className="mb-5 mt-3 w-full text-lg bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      );
}
