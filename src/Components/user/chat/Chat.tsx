
import { useEffect, useState, useRef } from 'react'
import { getChatList,  userOnline } from '../../../Api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store/store';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { UserHeader } from '../home/UserHeader';
import ChatUser from './ChatUser';
import { useLocation } from 'react-router-dom';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { recall } from '../../../redux/Slice/authSlice';
import { useDispatch } from 'react-redux';
import { ChatMessageData, CheckOnlineData } from '../../../utils/interface/user/chat/chatInterface';
const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL

export default function Chat() {
    const [newMessage, setNewMessage] = useState<string>("");
    const [message, setMessage] = useState<ChatMessageData[]>([]);
    const socketRef = useRef<any>(null);
    const userId = useSelector((state: RootState) => state.auth.userId);
    const location = useLocation()
    const { userProfile } = location.state || {};
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate()
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const dispatch = useDispatch()
    

    // Set header for auth

    const headers = {
        'Content-type': 'application/json',
    };


    // Get all messages

    const fetchMessages = async () => {
        try {
            const response: AxiosResponse<ChatMessageData[]> = await getChatList(userId, String(userProfile.id), headers);
            setMessage(response.data)
        } catch {
            console.log("The data is did't fetch")
        }
    }


    // Check online

    const checkOnline = async () => {
        try {
            const response: AxiosResponse<CheckOnlineData> = await userOnline(String(userProfile.id), headers);
            setIsOnline(response.data.online);
        } catch {
            console.log("The data is did't fetch")
        }
    }


    // Initialize WebSocket


    useEffect(() => {

        const initializeWebSocket = () => {
            if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
                socketRef.current = new WebSocket(`${WEBSOCKET_URL}/ws/chat/?chat_user=${String(userProfile.id)}&user=${userId}`);
                dispatch(recall())

                socketRef.current.onmessage = (event:any) => {

                    try {
                        const data = JSON.parse(event.data);
                        console.log("message data", data)
                        if (
                            typeof data === "object" &&
                            data.id &&
                            data.chat_room &&
                            data.user &&
                            data.content &&
                            data.timestamp
                        ) {
                            setMessage((prevMessage) => [...prevMessage, data])
                        }
                        else {
                            console.log(data.user_id,userId)
                            if(data.user_id!==parseInt(userId)){
                                setIsOnline(data.status)
                            }
                        }

                    } catch (error) {
                        console.error("Error parsing Websocketmessage data:", error)
                    };
                }

                socketRef.current.onerror = (error:any) => {
                    console.log("websocket error:", error)
                }

                socketRef.current.onclose = (event:any) => {
                    console.log("websocket connection closed: ", event)
                }

            }
        }

        checkOnline()
        .then(() => fetchMessages())
        .then(() => initializeWebSocket())

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        }

    }, [userProfile.id, userId]);


    // Manage scrolling

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [message]);



    // Sent message

    const sendMessage = (e :React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const message = newMessage.trim();

        if (message === "") {
            return;
        }
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ message: newMessage }));
            setNewMessage('');

        }
    };

    // Sent call notification

    const sendCallRequest = (username:string, user_id:string, userId:string) => {
        const data = {
            id: user_id,
            fullName: username,
            userId:userId,
        };
        navigate('/video_call', { state: data })
    }


    // Back button

    const handleBack = () =>{
        navigate("/chat_list")
    }



    return (

        <div>
            <UserHeader />
            <div className="container mx-auto shadow-lg rounded-lg h-screen">
                <div className="flex flex-col lg:flex-row h-full bg-gray-900">
                    {/* Left Panel: User List */}
                    <div className="flex flex-col w-full lg:w-2/5 border-r-2 overflow-y-auto h-full ">
                        <ChatUser />
                    </div>
                    {/* Right Panel: Chat Section */}
                    <div className="w-full lg:w-3/5 px-5 flex flex-col justify-between h-full">
                        <div className="flex items-center p-3 border-b cursor-pointer last:border-b-0">
                            {userProfile.user_profile ? (
                                <img
                                    src={userProfile.user_profile}
                                    alt={userProfile.full_name}
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">
                                        {userProfile.full_name.charAt(0)}
                                    </span>
                                </div>
                            )}

                            <div className="flex flex-col flex-grow">
                                <span className="font-medium text-white">{userProfile.full_name}</span>
                                {isOnline ?  (
                                    <span className="font-normal text-green-600">Online</span>
                                ) : (
                                    <span className="font-normal text-white">Offline</span>
                                )}
                            </div>

                            {/* Video Call Button */}
                            <button
                                onClick={handleBack}
                                className="ml-auto bg-green-600 hover:bg-green-700 text-white font-semibold  px-2 py-1 rounded transition-colors duration-200 mr-1"
                            >
                                Back
                            </button>

                            <button
                                onClick={() => sendCallRequest(userProfile.full_name, userProfile.id, userId)}
                                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded transition-colors duration-200"
                            >
                                Meeting
                            </button>
                        </div>
                        {/* Chat Messages */}
                        <div className="flex flex-col mt-5 overflow-y-auto h-full" ref={chatContainerRef}>

                            {/* Dynamic messages */}
                            {message && message.map((msg, idx) => (
                                msg.user.toString() == userId ? (
                                    <div key={idx} className="flex justify-end mb-4">
                                        <div>
                                            <div className="mt-4 mr-2 py-3 px-4 bg-green-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-black">
                                                {msg.content}
                                        
                                                <div className="flex justify-end mt-1">
                                                    <span className={`text-xs ${msg.read ? 'text-blue-500' : 'text-gray-500'}`}>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500 text-right mt-1">
                                                {new Date().toLocaleDateString()} {/* Displays the current date */}
                                            </div>
                                        </div>
                                    </div>

                                ) : (

                                    <div key={idx} className="flex justify-start mb-4">
                                        {userProfile.user_profile ?
                                            <img
                                                src={userProfile.user_profile}
                                                className="object-cover h-8 w-8 rounded-full"
                                                alt=""
                                            />
                                            :
                                            <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">
                                                    {userProfile.full_name.charAt(0)}
                                                </span>
                                            </div>
                                        }

                                        <div className="ml-2">
                                            <div className="py-3 px-4 bg-gray-50 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
                                                {msg.content}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {new Date(msg.timestamp).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                )
                            ))}

                        </div>

                        {/* Chat input */}
                        <div className="py-5">
                            <form onSubmit={sendMessage}>
                                <input
                                    className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message here..."
                                />
                                <button className="hidden" type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
