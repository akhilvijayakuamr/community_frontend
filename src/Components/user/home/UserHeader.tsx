import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../../redux/Slice/authSlice';
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import { RootState } from '../../../redux/Store/store';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { getNotification, readNotification } from '../../../Api/api';


export const UserHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [isNotification, setIsNotification] = useState<boolean>(false);
    const [notication, setNotification] = useState<Notification[]>([]);
    const dispatch = useDispatch()
    const socketRef = useRef<any>(null);
    const navigate = useNavigate()
    const Login = useSelector((state: RootState) => state.auth.login)
    const profile = useSelector((state: RootState) => state.auth.user_profile)
    const userId = useSelector((state: RootState) => state.auth.userId)
    const userToken = useSelector((state: RootState) => state.auth.user_token)
    


    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
    };


    // check user is login or not

    useEffect(() => {
        if (!Login) {
            navigate('/user_login')
        }
        getNotifications()

    }, [userId])


    const getNotifications = async () => {
        try {
            const response: AxiosResponse<any[]> = await getNotification(userId, headers)
            console.log(response.data)
            setNotification(response.data)
            setUnreadCount(response.data.filter(item => item.read === false).length)
            
        } catch {
            console.error("The data is not fetch")
        }
    }


    const readNotifications = async () => {
        try {
            const response: AxiosResponse<any[]> = await readNotification(userId, headers)
            console.log(response.data)
            setUnreadCount(0)
        } catch {
            console.error("The data is not fetch")
        }
    }



    if(isNotification){
        
        readNotifications()
    }





    useEffect(() => {


        const initializeWebSocket = () => {
            if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
                socketRef.current = new WebSocket(`ws://localhost:8000/ws/notification/?user=${userId}`);

                socketRef.current.onmessage = (event) => {

                    try {
                        const data = JSON.parse(event.data);
                        console.log("reveived message", data)
                         if (
                            typeof data === "object") {
                            setNotification((prevNotification) => [data, ...prevNotification]);
                            if(isNotification){
                                readNotifications()
                            }else{
                                setUnreadCount((prevUnreadCount) => prevUnreadCount + 1);
                            }
                                

                        }
                        else {
                            console.error("The formate is not correct", data)
                        }


                    } catch (error) {
                        console.error("Error parsing Websocketmessage data:", error)
                    };
                }

                socketRef.current.onerror = (error) => {
                    console.log("websocket error:", error)
                }

                socketRef.current.onclose = (event) => {
                    console.log("websocket connection closed: ", event)
                    setTimeout(initializeWebSocket, 5000)
                }

            }


        }


        getNotifications().then(() =>initializeWebSocket());

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        }

    }, [userId]);

    



    const createPost = () => {
        navigate('/createpost')
    }

    


    const handleGetProfile = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        const profileId = e.currentTarget.id;
        navigate('/profile', { state: { profileId: profileId } })
    }






    // User logout


    const handleAdminLogout = () => {
        dispatch(userLogout())
        navigate('/user_login')
    }





    return (
        <nav className="bg-gray-950 shadow-lg border border-gray-500 ">
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
                        <button onClick={createPost} className="bg-gray-100 text-sm font-bold text-black px-7 py-2 rounded-md hover:bg-gray-300 mr-4">
                            NEW POST
                        </button>
                        <div className="relative" onClick={() => setIsNotification(!isNotification)}>
                            <button className="text-white bg-blue-500 p-2 rounded-full focus:outline-none mr-5" >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0018 14.172V11a6 6 0 00-9.33-5.076M9 11v1.748A2.032 2.032 0 007.405 15.595L6 17h5m-3 0a3.001 3.001 0 005.293 1.707M9 21h6" />
                                </svg>
                            </button>
                            {/* Notification count badge */}
                            {/* {unreadCount > 0 && ( */}
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
                                {unreadCount}
                            </span>
                            {/* )} */}
                        </div>
                        {/* Profile */}
                        <div className="hidden md:flex">
                            <div className="relative">
                                <button className="flex items-center focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    {profile ?
                                        <img
                                            className="h-10 w-10 rounded-full border-2 border-gray-400"
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
                                        <a id={userId} onClick={handleGetProfile} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                            Profile
                                        </a>
                                        <Link to='/chat_list' className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Chat
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


            {isNotification && (
                <div className="absolute right-0 mt-2 w-500 mr-4 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <ul className="mt-4 bg-white rounded-xl shadow-lg max-h-64 overflow-y-auto">
                        {notication.map(user => (
                            <a

                                id={user.id}
                            >
                                <li

                                    className="flex items-center p-3 border-b hover:bg-gray-100 cursor-pointer last:border-b-0"
                                >
                                    {user.user_profile ? (
                                        <img
                                            src={user.user_profile}
                                            alt={user.full_name}
                                            className="w-10 h-10 rounded-full mr-3 object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">
                                                {user.full_name.charAt(0)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex flex-col">
                                        {
                                            user.post ?
                                                <span className="font-medium text-gray-800">{`${user.full_name} is ${user.content} your post `}</span>
                                                :
                                                <span className="font-medium text-gray-800">{`${user.full_name} is ${user.content} you`}</span>
                                        }

                                        <span className="text-sm text-gray-500">{new Date(user.timestamp).toLocaleString()}</span>
                                    </div>
                                </li>
                            </a>

                        ))}
                    </ul>
                </div>
            )}

        </nav>
    );
}
