import React from 'react';
import page404 from '../../assets/images/404.jpeg';
import { Link } from 'react-router-dom';

const Admin404: React.FC = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${page404})`,
        backgroundColor: '#000',
      }}
    >
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold sm:text-5xl md:text-4xl">404</h1>
        <p className="text-xl sm:text-lg md:text-base mt-2">Page Not Found</p>
        <Link to='/dashboard'
          className="mt-4 inline-block px-6 py-3 bg-orange-600 text-white text-lg rounded hover:bg-orange-700 transition sm:text-base sm:px-4 sm:py-2"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Admin404;
