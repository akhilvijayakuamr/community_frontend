import React from 'react'
import { UserHeader } from '../home/UserHeader'
import { useNavigate } from 'react-router-dom'

const Success: React.FC = () => {

    const navigate = useNavigate()

    // Navigate to chatpage

    const handlChat =()=>{
        navigate('/chat_list')
    }

    // Navigate to Home page

    const handleHome =()=>{
        navigate('/Home')
    }
    return (
        <div>
            <UserHeader/>
            <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
                <div className="relative p-6 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800">

                    <div className="text-center">
                        <svg
                            className="mx-auto mb-4 text-green-500 w-16 h-16 dark:text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 17.5v3.25m0 0H9m3 0h3M12 3a9 9 0 0 1 9 9c0 4.08-2.61 7.44-6.26 8.71A3 3 0 0 1 12 17a3 3 0 0 1-2.74 3.71C5.61 19.44 3 16.08 3 12a9 9 0 0 1 9-9Z"
                            />
                        </svg>
                        <h3 className="mb-3 text-xl font-bold text-green-500 dark:text-green-600">
                            Payment Succefully
                        </h3>
                        <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                            Enjoy seamless one-on-one video calls and real-time chat .
                        </p>
                        <button
                            onClick={handlChat}
                            type="button"
                            className="w-full mb-2 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-900"
                        >
                            Go to Chat
                        </button>
                        <button
                            onClick={handleHome}
                            type="button"
                            className="w-full py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-400 dark:bg-blue-700 dark:text-blue-300 dark:hover:bg-blue-600 dark:focus:ring-blue-600"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Success