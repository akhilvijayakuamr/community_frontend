import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../../redux/Slice/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store/store';


export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const Login = useSelector((state: RootState) => state.auth.admin_login)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    // Check user is login or not

    useEffect(() => {
        if (!Login) {
            navigate('admin')
        }
    }, [])


    // Mobile toggle


    const toogleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    // Logout 

    const handleAdminLogout = () => {
        dispatch(adminLogout())
        navigate('/admin')
    }


    return (
        <header className='bg-teal-800 p-4 shadow-md flex items-center justify-between'>
            <div className='text-lg font-bold'>AssureTech</div>
            <nav className='flex items-center'>
                <ul className='hidden lg:flex space-x-4'>
                    <li>
                        <Link to='/dashboard' className='text-white hover:text-gray-200'>Home</Link>
                    </li>
                    <li>
                        <Link to='/userlist' className='text-white hover:text-gray-200'>Users</Link>
                    </li>
                    <li>
                        <Link to='/post_list' className='text-white hover:text-gray-200'>Posts</Link>
                    </li>
                    <li>
                        <button className='bg-gray-500 rounded-lg pl-3 pr-3 text-white' onClick={handleAdminLogout}>
                            Logout
                        </button>
                    </li>
                </ul>

                {/* Mobile view */}

                <button
                    className='lg:hidden text-gray_700'
                    onClick={toogleMenu}>☰</button>
            </nav>

            {isMenuOpen && (
                <div className='lg:hidden fixed inset-0 z-30 bg-gray-800 text-white flex flex-col items-center pt-16'>
                    <ul className='space-y-4'>
                        <li>
                            <Link to='/dashboard' className='block px-4 py-2 hover:bg-gray-700' onClick={toogleMenu} >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/userlist' className='block px-4 py-2 hover:bg-gray-700' onClick={toogleMenu}>
                                Userlist
                            </Link>
                        </li>
                        <li>
                            <Link to='/post_list' className='block px-4 py-2 hover:bg-gray-700' onClick={toogleMenu}>
                                Userlist
                            </Link>
                        </li>
                        <li>
                            <a className='block px-4 py-2 hover:bg-gray-700' onClick={handleAdminLogout}>Logout</a>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )


}