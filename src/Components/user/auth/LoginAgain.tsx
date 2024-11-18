import React from 'react';
import page from '../../../assets/images/mainbackground.jpeg'
import { userLogout } from '../../../redux/Slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LoginAgain: React.FC = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // User logout

  const handleLogout = () =>{
    dispatch(userLogout())
    navigate('/user_login')
  }

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${page})`,
        backgroundColor: '#000',
      }}
    >
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold sm:text-5xl md:text-4xl text-white bpo">Please Login Again</h1>
        <a onClick={handleLogout}
          className="mt-4 inline-block px-6 py-3 bg-gray-700 text-white text-lg rounded hover:bg-gray-800 transition sm:text-base sm:px-4 sm:py-2"
        >
          Go Back Login
        </a>
      </div>
    </div>
  );
};

export default LoginAgain;
