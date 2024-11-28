import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../../redux/Slice/authSlice';
import Logo from '../../../assets/images/AssureTech_transparent-.png'
import { RootState } from '../../../redux/Store/store';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { getNotification, readNotification, searchUser } from '../../../Api/api';
import { recall } from '../../../redux/Slice/authSlice';
import { callNotification, NotificationInterface } from '../../../utils/interface/user/header/headerinterface';
import useDebounce from '../../../hooks/useDebounce';
import { ToastContainer, toast } from 'react-toastify';
const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL


export const UserHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [isNotification, setIsNotification] = useState<boolean>(false);
    const [notication, setNotification] = useState<NotificationInterface[]>([]);
    const dispatch = useDispatch()
    const socketRef = useRef<any>(null);
    const navigate = useNavigate()
    const Login = useSelector((state: RootState) => state.auth.login)
    const profile = useSelector((state: RootState) => state.auth.user_profile)
    const userId = useSelector((state: RootState) => state.auth.userId)
    const [popUp, setPopUp] = useState<boolean>(false);
    const [searchData, setSearchData] = useState<any[]>([])
    const [query, setQuery] = useState<string>('')
    const [callData, setCallData] = useState<callNotification>({
        notification: '',
        full_name: '',
        service: ''
    })
    const debounce = useDebounce(query, 500)
    let isMounted = useRef(false);
    const token = useSelector((state:RootState) => state.auth.user_token)


    // Headers for auth

    const headers = {
        'Content-Type': 'application/json',
        'Authorization' :`Bearer ${token}`
    };


    // check user is login or not

    useEffect(() => {
        if (!Login) {
            navigate('/user_login')
        }
        getNotifications()

    }, [userId])


    // Get all notification

    const getNotifications = async () => {
        try {
            const response: AxiosResponse<NotificationInterface[]> = await getNotification(userId, headers)
            setNotification(response.data)
            setUnreadCount(response.data.filter(item => item.read === false).length)

        } catch {
            console.error("The data is not fetch")
        }
    }


    // Read all notification


    const readNotifications = async () => {
        try {
            await readNotification(userId, headers)
            setUnreadCount(0)
        } catch {
            console.error("The data is not fetch")
        }
    }


    // Call readnotification

    if (isNotification) {
        readNotifications()
    }


    // Initialize WebSocket


    useEffect(() => {
        isMounted.current = true
        const initializeWebSocket = () => {
            if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
                socketRef.current = new WebSocket(`${WEBSOCKET_URL}/ws/notification/?user=${userId}`);

                socketRef.current.onmessage = (event: any) => {
                    try {
                        const data = JSON.parse(event.data);
                        if (data.service) {
                            setCallData(data)
                            const startTime = () => {
                                setTimeout(() => {
                                    setPopUp(true)
                                }, 6000)
                            }
                            startTime()
                        }
                        else if (data.triger) {
                            dispatch(recall())
                            toast.success("You've Got a New Message")
                        }
                        else if (
                            typeof data === "object") {
                            setNotification((prevNotification) => [data, ...prevNotification]);
                            if (isNotification) {
                                readNotifications()
                            } else {
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

                socketRef.current.onerror = (error: any) => {
                    console.log("websocket error:", error)
                }

                socketRef.current.onclose = (event: any) => {
                    console.log("websocket connection closed: ", event)
                    if (isMounted.current) {
                        setTimeout(initializeWebSocket, 5000);
                    }
                }

            }


        }


        initializeWebSocket();

        return () => {
            isMounted.current = false;
            if (socketRef.current) {
                socketRef.current.close();
            }
        }

    }, [userId]);



    // Navigate Create Post Component

    const createPost = () => {
        navigate('/createpost')
    }


    // Videocall popup

    const closePopup = () => {
        setPopUp(false);
    };


    // View Profile

    const handleGetProfile = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const profileId = e.currentTarget.id;
        navigate('/profile', { state: { profileId: profileId } })
        setQuery('')
    }

    // Search user

    const handleGetUsers = async () => {
        try {
            if (query) {
                const response: AxiosResponse<any[]> = await searchUser(query, userId, headers)
                console.log("search response", response.data)
                setSearchData(response.data)
            } else {
                setSearchData([])
            }
        } catch {
            setSearchData([])
        }
    }

    // Auto search using debounce

    useEffect(() => {
        handleGetUsers()
    }, [debounce])



    // User logout


    const handleUserLogout = () => {
        dispatch(userLogout())
        navigate('/user_login')
    }



    // View page

    return (
        <nav className="bg-gray-950 shadow-lg border border-gray-500 ">
            <ToastContainer />
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
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-96 px-4 py-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:border border-gray-300"
                            />
                            <div className="absolute left-0 mt-12 w-500 ml-4 rounded-md shadow-lg py-1 z-50">
                                <ul className="mt-4 bg-white rounded-xl shadow-lg max-h-64 overflow-y-auto">
                                    {searchData.map(user => (
                                        <a key={user.id} id={user.id} onClick={handleGetProfile}>
                                            <li className="flex items-center p-3 border-b hover:bg-gray-100 cursor-pointer last:border-b-0">
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
                                                    <span className="font-medium text-gray-800">{user.full_name}</span>
                                                    <span className="text-sm text-gray-500">@{user.username}</span>
                                                </div>
                                            </li>
                                        </a>
                                    ))}
                                </ul>
                            </div>

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

                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
                                {unreadCount}
                            </span>
                        </div>
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

                                        <a onClick={handleUserLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
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

                            <a onClick={handleUserLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                                Logout
                            </a>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-96 px-4 py-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:border border-gray-300"
                            />
                        </div>

                    </div>
                </div>
            )}


            {/* Video call notification */}

            {popUp && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                        <p className="font-bold text-lg">Notification for: {callData.full_name}</p>
                        <p className="mt-4">Click below to join the meet:</p>
                        <button
                            onClick={() => {
                                window.location.href = callData.notification;
                                closePopup();
                            }}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Take the Call
                        </button>
                        <button
                            onClick={closePopup}
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Notification view */}

            {isNotification && (
                <div className="absolute right-0 mt-2 w-500 mr-4 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <ul className="mt-4 bg-white rounded-xl shadow-lg max-h-64 overflow-y-auto">
                        {notication.map(user => (
                            <a

                                id={user.id.toString()}
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