import React, { useState } from 'react'
import { UserHeader } from '../home/UserHeader'
import { PostData } from '../../../utils/interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/Store/store'
import { AxiosResponse } from 'axios'
import { PostCreate } from '../../../Api/api'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export const CreatePost: React.FC = () => {

    // Define initial post data 

    const [postData, setPostData] = useState<PostData>({
        id: '',
        title: '',
        content: '',
        link: '',
        postImage: null
    })



    const usertoken: string | null = useSelector((state: RootState) => state.auth.user_token)
    const userId: string = useSelector((state: RootState) => state.auth.userId)
    const navigate = useNavigate()


    // Set headers for auth

    const headers = {
        Authorization: `Bearer ${usertoken}`,
        'Content-Type': 'multipart/form-data',
    };



    // Validate every fields is required and Create post



    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if (!postData.title.trim() || !postData.content.trim() || !postData.link .trim()|| !postData.postImage) {
            toast.error("Please fill in all required fields.");
            return
        }
        
        setPostData({...postData, id:userId})

        try{
            const response: AxiosResponse<any> = await PostCreate(postData, headers);
            console.log("response", response.data.post_id)
            navigate('/viewpost', { state: { postId: response.data.post_id } })
            toast.success(response.data)
        }catch{
            toast.error("Post creation is not successfull")
        }
    }


    // User view


    return (
        <div>
            <UserHeader />
            <ToastContainer/>
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="w-full max-w-3xl bg-gray-950 rounded-lg shadow-lg ">


                    {/* Sign Up Form */}
                    <h2 className="text-2xl font-bold text-white text-center mb-6 mt-10">
                        Create Post
                    </h2>
                    <form  onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-white font-semibold mb-2"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={postData?.title?postData.title:""}
                                onChange={(e)=>setPostData({...postData, title:e.target.value})}
                                placeholder="Enter Title"
                                className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500   rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
                            />
                        </div>

                        <div className="col-span-2 mb-2">

                            <textarea
                                id="description"
                                name="description"
                                value={postData?.content?postData.content:''}
                                onChange={(e)=>setPostData({...postData, content:e.target.value})}
                                rows={10}
                                className="block p-3 w-full  bg-slate-900 text-smbg-slate-900 border-l-2 border-red-500   rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
                                placeholder="Share your thoughts"
                            />
                        </div>


                        <div className="mb-4">
                            <label
                                htmlFor="link"
                                className="block text-white font-semibold mb-2"
                            >
                                Link
                            </label>
                            <input
                                type="url"
                                id="link"
                                value={postData?.link?postData.link:""}
                                onChange={(e)=>setPostData({...postData, link:e.target.value})}
                                placeholder="Enter article link"
                                className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500   rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-white font-semibold mb-2"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                id="postimage"
                                onChange={(e)=>setPostData({...postData, postImage:e.target.files?.[0] ?? null})}
                                placeholder="Enter Title"
                                className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500   rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
                            />
                        </div>





                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="w-full bg-white text-Black py-2 rounded-md font-semibold hover:bg-gray-300 focus:outline-none  focus:ring-offset-2 focus:border-white focus:bg-gray-400 mb-9 mt-3"
                        >
                            Submit
                        </button>
                    </form>


                </div>
                <div />
            </div>
        </div>
    )
}
