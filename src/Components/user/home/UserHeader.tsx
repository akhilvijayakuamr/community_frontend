import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../../redux/Slice/authSlice';
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import { RootState } from '../../../redux/Store/store';
import { Link } from 'react-router-dom';

export const UserHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Login = useSelector((state: RootState) => state.auth.login)
    const profile = useSelector((state: RootState) => state.auth.user_profile)



    // check user is login or not

    useEffect(() => {
        if (!Login) {
            navigate('/user_login')
        }
    }, [])



    const createPost = () =>{
        navigate('/createpost')
    }






    // User logout


    const handleAdminLogout = () => {
        dispatch(userLogout())
        navigate('/user_login')
    }


 

    return (
        <nav className="bg-gray-950 shadow-lg border border-gray-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a href="/">
                                <img
                                    className="h-16 w-20"
                                    src={Logo}
                                    alt="Logo"
                                />
                            </a>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex ml-10">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-96 px-4 py-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:border border-gray-300"
                            />
                        </div>
                       
                    </div>

                    
                    {/* Profile and Mobile Menu */}
                    <div className="flex items-center">
                    <button onClick={createPost} className="bg-gray-100 text-sm font-bold text-black px-10 py-2 rounded-md hover:bg-gray-300 mr-10">
                        NEW POST
                    </button>
                        {/* Profile */}
                        <div className="hidden md:flex">
                            <div className="relative">
                                <button className="flex items-center focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    {profile?
                                        <img
                                        className="h-10 w-10 rounded-full"
                                        src={profile}
                                        alt="Profile"
                                        />
                                        :

                                        <img
                                        className="h-10 w-10 rounded-full"
                                        src="https://via.placeholder.com/40"
                                        alt="Profile"
                                    />
                                    }
                                    
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                                        <Link to='/Home' className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Home
                                        </Link>
                                        <Link to='/profile' className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Profile
                                        </Link>
                                        <a onClick={handleAdminLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    {isMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Profile
                        </a>
                        <a
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >isMenuOpen
                            Settings
                        </a>
                        <a
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Logout
                        </a>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            onClick={handleAdminLogout}
                        />
                    </div>
                </div>
            )}
        </nav>
    );
}
