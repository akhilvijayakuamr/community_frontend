import React from "react";


export const UserList: React.FC = () =>{
    const users = [
        {id:1, name: 'Akhil', email:'akhil@gmail.com'},
        {id:1, name: 'Akhil', email:'akhil@gmail.com'},
        {id:1, name: 'Akhil', email:'akhil@gmail.com'},
        {id:1, name: 'Akhil', email:'akhil@gmail.com'},
    ];

    return(
        <div className="mt-8">
            
            <h2 className="text-lg font-bold mb4 ">
                User List
            </h2>
            <ul className="space-y-2">

                <li 
                    className="p-4 bg-white shadow rounded flex justify-between items-center"
                    >
                        <div>
                        <h3 className="text-gray-900">Name</h3>
                        </div>
                        <div className="text-gray-900">
                            <h3 className="text-gray-900 ">Email</h3>
                        </div>
                        <div>
                            
                        </div>
                    </li>
                {users.map((user) => (
                    <li key = {user.id}
                    className="p-4 bg-white shadow rounded flex justify-between items-center"
                    >
                        <div>
                        <h3 className="text-gray-900">{user.name}</h3>
                        </div>
                        <div className="text-gray-900">
                            <h3 className="text-gray-900">{user.email}</h3>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700">
                            view Profile
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}