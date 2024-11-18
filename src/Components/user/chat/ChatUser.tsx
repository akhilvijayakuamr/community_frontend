import React, { useEffect, useState } from 'react'
import { RootState } from '../../../redux/Store/store';
import { useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { getUserChat, searchUser} from "../../../Api/api";
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import { UserSearh, ChatUserList } from '../../../utils/interface/user/chat/chatUserListInterface';


export default function ChatUser() {
    const recalling = useSelector((state: RootState) => state.auth.recalluser)
    const userId = useSelector((state: RootState) => state.auth.userId)
    const [userList, setUserList] = useState<ChatUserList[]>([]);
    const navigate = useNavigate()
    const [query, setQuery] = useState<string>('');
    const [searchData, setSearchData] = useState<UserSearh[]>([]);
    const debounce = useDebounce(query, 500)


    // Set headers for auth

    const headers = {
        'Content-Type': 'application/json',
    };


    // Search User

    const handleGetUsers = async () => {
        try {
            if(query){
                const response: AxiosResponse<UserSearh[]> = await searchUser(query, userId, headers)
                setSearchData(response.data)
            }else{
                setSearchData([])
            }
        } catch {
            setSearchData([])
        }
    }


    // Updated handleGetUserChat function

    const handleGetUserChat = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        user: { id: string; full_name: string; profile_image?: string; username: string}
    ) => {
        e.preventDefault();

        const chatUserId: string = e.currentTarget.id;

        if (chatUserId) {
            navigate('/chat', {
                state: {
                    userProfile: user, 
                }
            });
        } else {
            console.error("Chat user ID is not available");
        }

        setQuery('');
    };


    // Auto search using debounce

    useEffect(() => {
        handleGetUsers()
    }, [debounce])


    // Get all chat user data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<ChatUserList[]> = await getUserChat(userId, headers);
                console.log("all user data=====", response.data)
                setUserList(response.data)

            } catch {
                console.log("The data is did't fetch")
            }
        }
        fetchData()
    }, [recalling])


    // User view

    return (
        <div>
            {/* Search bar */}
            <div className="border-b-2 py-4 px-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="search chatting"
                    className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                />

                <ul className="mt-4 bg-white rounded-xl shadow-lg max-h-64 overflow-y-auto">
                    {searchData.map(user => (
                        <a
                            key={user.id}
                            id={user.id.toString()}
                            onClick={(e) => handleGetUserChat(e, user)}
                        >
                            <li

                                className="flex items-center p-3 border-b hover:bg-gray-100 cursor-pointer last:border-b-0"
                            >
                                {user.user_profile ? (
                                    <img
                                        src={user.user_profile}
                                        alt={user.full_name}
                                        className="w-10 h-10 rounded-full mr-3 object-cover "
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


            {/* User List */}

            <div className="overflow-y-auto">
                {userList.map((data) => (
                    <a key={data.id}
                        id={data.id}
                        onClick={(e) => handleGetUserChat(e, data)}
                    >
                        <div
                            className="flex flex-row py-4 px-2 justify-center items-center border-b-2 bg-gray-800"
                        >

                            {
                                data.user_profile ?
                                    <img
                                        src={data.user_profile}
                                        alt={data.full_name}
                                        className="w-10 h-10 rounded-full mr-3 object-cover"
                                    />
                                    :
                                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">
                                            {data.full_name.charAt(0)}
                                        </span>
                                    </div>

                            }
                           
                                <div className="w-full">
                                <div className="text-lg font-semibold text-white">{data.full_name}</div>
                            {
                                data.message !== 0?
                                <span className="text-red-700">{data.message} messages</span>
                                :
                                <span></span>

                            }
                            </div>
                           
                        </div>
                    </a>

                ))}
            </div>
        </div>
    )
}
