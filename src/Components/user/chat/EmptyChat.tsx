
import React from 'react'
import { UserHeader } from '../home/UserHeader'
import ChatUser from './ChatUser'


export default function EmptyChat() {
    return (
        <div>
            <UserHeader />
            <div className="container mx-auto shadow-lg rounded-lg h-screen">

                <div className="flex flex-col lg:flex-row h-full bg-gray-900">

                    {/* Left Panel: User List */}
                    <div className="flex flex-col w-full lg:w-2/5 border-r-2 overflow-y-auto h-full">
                        <ChatUser />
                    </div>


                    {/* Right Panel: Chat Section */}
                    <div className="w-full lg:w-3/5 px-5 flex flex-col justify-between h-full">
                        {/* Chat Messages */}
                      
                       
                    </div>
                </div>
            </div>
        </div>

    )
}
