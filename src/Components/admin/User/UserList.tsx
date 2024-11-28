import React, { useEffect, useState } from "react";
import { UsersList, UserBlockData } from "../../../utils/interface/admin/home/userListInterface";
import { AxiosResponse } from "axios";
import { userListApi, AdminBlockUnblock } from "../../../Api/api";
import { ToastContainer, toast } from 'react-toastify';



export const UserList: React.FC = () => {
    const [userList, setUserList] = useState<UsersList[]>([]);


    // Set headers for auth

    const headers = {
        'Content-Type': 'application/json',
    };


    // Fetch all user data


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<UsersList[]> = await userListApi(headers);
                setUserList(response.data)

            } catch {
                console.log("The data is did't fetch")
            }
        }
        fetchData()
    }, [])



    // Block and Unblock users


    const onBlockUnblockClick = async (userId: string) => {
        try {
            const messages: AxiosResponse<UserBlockData> = await AdminBlockUnblock(userId, headers)
            console.log("response", messages)
            toast.success(messages.data.message)
            const response: AxiosResponse<UsersList[]> = await userListApi(headers);
            setUserList(response.data)
        } catch (error) {
            console.error('Error handling confirmation:', error);
        }


    }

    // User view

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <ToastContainer/>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase font-bold bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Full Name
                        </th>
                        <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user) => (
                        <tr
                            key={user.id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {user.full_name}
                            </th>
                            <td className="px-6 py-4 hidden sm:table-cell">{user.username}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                                {user.is_active ? (
                                    <button
                                        onClick={() => onBlockUnblockClick(user.id)}
                                        className="font-bold bg-red-500 text-black p-2 pl-3 pr-3 rounded-xl hover:bg-red-800 hover:text-white"
                                    >
                                        Block
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onBlockUnblockClick(user.id)}
                                        className="font-bold bg-blue-500 text-black p-2 pl-3 pr-3 rounded-xl hover:bg-blue-800 hover:text-white"
                                    >
                                        Unblock
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}