import React from 'react'
import { UserHeader } from '../home/UserHeader'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/Store/store'

const CallReview: React.FC = () => {
    const navigate = useNavigate()
    const premium = useSelector((state: RootState) => state.auth.is_premium)


    // Redirect Chat

    const handlChat = () => {
        navigate("/chat_list")
    }

    // Redirect Home

    const handleHome = () => {
        navigate('/Home')
    }


    // User view

    return (
        <div>
            <UserHeader />
            <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
                <div className="relative p-6 w-full max-w-md  rounded-lg shadow bg-gray-800">

                    <div className="text-center">
                        <svg
                            className="mx-auto mb-4  w-16 h-16 text-green-500"
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
                        <h3 className="mb-3 text-xl font-bold text-green-600">
                            Call is completed
                        </h3>
                        <p className="mb-5 text-sm text-gray-400">
                            Enjoy seamless video calls.
                        </p>
                        {premium ?
                            <div>
                                <button
                                    onClick={handlChat}
                                    type="button"
                                    className="w-full mb-2 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-900"
                                >
                                    Go to Chat
                                </button>
                                <button
                                    onClick={handleHome}
                                    type="button"
                                    className="w-full py-2 text-sm font-medium rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-400 bg-blue-700 text-blue-300 hover:bg-blue-600 dark:focus:ring-blue-600"
                                >
                                    Go to Home
                                </button>
                            </div>

                            :

                            <button
                                onClick={handleHome}
                                type="button"
                                className="w-full py-2 text-sm font-medium  rounded-lg  focus:ring-4 focus:outline-none bg-blue-700 text-blue-300 hover:bg-blue-600 focus:ring-blue-600"
                            >
                                Go to Home
                            </button>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallReview