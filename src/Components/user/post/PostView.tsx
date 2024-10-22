import React, { useEffect, useState } from 'react'
import { UserHeader } from '../home/UserHeader'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/Store/store'
import { AxiosResponse } from 'axios'
import { UniquePostData, ReplyFormData, PostData, PostUpdateData } from '../../../utils/interfaces'
import { postGetApi, postLikeApi, postCommentApi, postReplayComment, PostUpdate, CommentDelete, replyDelete, postDelete, postReport } from '../../../Api/api'
import { ToastContainer, toast } from 'react-toastify';
import UserProfileLoading from '../../Loading/UserProfileLoading'


export const PostView: React.FC = () => {
    const location = useLocation()
    const [comment, setComment] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
    const [isPostOpen, setIsPostOpen] = useState<boolean>(false);
    const [replay, setReplay] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [replyInputCommentId, setReplayInputCommentId] = useState<string | null>(null)
    const [replyInputReplyId, setReplayInputReplyId] = useState<string | null>(null)
    const [replyInputReplyListId, setReplayInputReplyListId] = useState<string | null>(null)
    const userToken: string | null = useSelector((state: RootState) => state.auth.user_token)
    const userId: string = useSelector((state: RootState) => state.auth.userId)
    const [reloadPostData, setReloadPostData] = useState<boolean>(false)
    const navigate = useNavigate()
    const [report, setReport] = useState<string>('');


    // Unique Post Data

    const [postData, setPostData] = useState<UniquePostData>({
        post_id: "",
        user_id: "",
        title: "",
        content: "",
        link: "",
        date: "",
        postimage: null,
        profileimage: null,
        bio: "",
        full_name: "",
        username: "",
        like: false,
        like_count: 0,
        comment_count: "",
        comments: []
    })



    const [updateData, setUpdateData] = useState<PostUpdateData>({
        id: '',
        user_id: '',
        title: '',
        content: '',
        link: '',
        postImage: null,
    });


    const toggleModel = () => {

        setIsOpen(!isOpen)
    };


    const toggleReportModel = () => {

        setIsReportOpen(!isReportOpen)
    };



    const toggleMenu = () => {
        setIsPostOpen(!isPostOpen);
    };



    // Set headers for auth


    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'multipart/form-data',
    };


    // Get unique post

    useEffect(() => {
        setLoading(true)
        const postId = location.state.postId
        const fetchData = async () => {
            try {
                const respons: AxiosResponse<UniquePostData> = await postGetApi(postId, userId, headers);
                setPostData(respons.data)
                console.log("postdata", respons.data)
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            } catch {
                console.log("The data is did't fetch")
            }
        }
        fetchData()

    }, [reloadPostData])




    useEffect(() => {
        if (postData) {
            setUpdateData((prevData) => ({
                ...prevData,
                id: postData.post_id,
                user_id: userId,
                title: postData.title,
                content: postData.content,
                link: postData.link,
                postImage: postData.postimage

            }));
        }


    }, [postData]);


    // Like post  

    const handleLikeClick = async (postid: string) => {
        const updatedPost = {
            ...postData, like: !postData.like,
            like_count: postData.like ? postData.like_count - 1 : postData.like_count + 1
        };
        setPostData(updatedPost);
        try {
            const response: AxiosResponse<any> = await postLikeApi(postid, userId, headers)
            console.log(response)

        } catch (error) {
            console.error("Error", error)
        }
    }


    // Comment post

    const handleCommentClick = async (postid: string) => {
        try {
            const response: AxiosResponse<any> = await postCommentApi(postid, userId, comment, headers)
            console.log(response.data)
            setComment('')
            setReloadPostData(prev => !prev);
        } catch (error) {
            console.error("Error", error)
        }

    }




    // Replay comment

    const handleReplayComment = async (comment_id: string, full_name: string, user_id: string) => {

        if (replay.trim() === '') {
            toast.error("Your reply is empty")
            return
        }

        const commentReply: ReplyFormData = {
            userId: userId,
            mentionUserId: user_id,
            mentionUserFullName: full_name,
            commentId: comment_id,
            content: replay
        };


        try {
            const response: AxiosResponse<any> = await postReplayComment(commentReply, headers)
            console.log(response.data)
            setReplay('')
            setReloadPostData(prev => !prev)
            setReplayInputCommentId(null);
            setReplayInputReplyId(null);
        } catch (error) {
            console.error("Error", error)
        }
    }


    // Dropdown reply inputtag

    const handleReplyClick = (commentId: string) => {
        if (replyInputCommentId === commentId) {
            setReplayInputCommentId(null);
        } else {
            setReplayInputCommentId(commentId);
        }
    };

    // Dropdown reply replies inputtag

    const handleReplyReplyClick = (replyId: string) => {
        if (replyInputReplyId === replyId) {
            setReplayInputReplyId(null);
        } else {
            setReplayInputReplyId(replyId);
        }
    };


    // Dropdown all replies 

    const handleReplyListClick = (replyId: string) => {
        if (replyInputReplyListId === replyId) {
            setReplayInputReplyListId(null);
        } else {
            setReplayInputReplyListId(replyId);
        }
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       
        try {
            const response: AxiosResponse<any> = await PostUpdate(updateData, headers);
            console.log(response.data)
            setIsOpen(!isOpen)
            setIsPostOpen(!isPostOpen)
            toast.success(response.data.message)
            setReloadPostData(prev => !prev);
        } catch {
            toast.error("Updation is not successfull")
        }

    }


    const handleReportSubmit = async (postId:string) => {
        try {
            const response: AxiosResponse<any> = await postReport(postId, userId, report, headers);
            console.log(response.data)
            setIsPostOpen(!isPostOpen)
            setIsReportOpen(!isReportOpen)
            toast.success(response.data)
        } catch {
            toast.error("Report is not successfull")
        }

    }




    const handleCommentDelete = async (commentId: string) => {
        try {
            const response: AxiosResponse<any> = await CommentDelete(commentId, headers);
            toast.success(response.data)
            setReloadPostData(prev => !prev);
        } catch {
            toast.error("Deletion is not successfull")
        }
    }



    const handleReplayDelete = async (replyId: string) => {
        try {
            const response: AxiosResponse<any> = await replyDelete(replyId, headers);
            toast.success(response.data)
            setReloadPostData(prev => !prev);
        } catch {
            toast.error("Deletion is not successfull")
        }
    }


    const handlePostDelete = async (postId: string) => {
        try {
            const response: AxiosResponse<any> = await postDelete(postId, headers);
            toast.success(response.data)
            const profileId = postData.user_id;
            navigate('/profile', { state: { profileId: profileId.toString() } })
        } catch {
            toast.error("Deletion is not successfull")
        }
    }







    return (
        <div>
            <UserHeader />
            <ToastContainer />
            {
                loading ?
                    <UserProfileLoading />
                    :

                    <div className='flex justify-between min-h-screen  px-4 mx-auto  bg-zinc-900 pt-8'>
                        <article className='mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
                            <header className="mb-4 lg:mb-6 not-format">
                                <address className="flex items-center mb-6 not-italic">
                                    {
                                        postData.profileimage ?
                                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                <img className="mr-4 w-16 h-16 rounded-full" src={postData.profileimage} alt="Jese Leos" />
                                                <div>
                                                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{postData.full_name}</a>
                                                    <p className="text-base text-gray-500 dark:text-gray-400">{postData.username}</p>
                                                    {/* <p className="text-base text-gray-500 dark:text-gray-400">{postData.bio}</p> */}

                                                    <p className="text-base text-gray-500 dark:text-gray-400"><time title="February 8th, 2022">{postData.date}</time></p>
                                                </div>
                                            </div>
                                            :
                                            <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                <img className="mr-4 w-16 h-16 rounded-full" src="https://via.placeholder.com/40" alt="Jese Leos" />
                                                <div>
                                                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{postData.full_name}</a>
                                                    <p className="text-base text-gray-500 dark:text-gray-400">{postData.username}</p>
                                                    {/* <p className="text-base text-gray-500 dark:text-gray-400">{postData.bio}</p> */}

                                                    <p className="text-base text-gray-500 dark:text-gray-400"><time title="February 8th, 2022">{postData.date}</time></p>
                                                </div>
                                            </div>
                                    }

                                    {
                                        postData.user_id == userId ?


                                            <div className="ml-auto px-4 py-2  text-white font-semibold rounded-lg">
                                                {/* 3 Dots Button */}
                                                <button
                                                    onClick={toggleMenu}
                                                    className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                                                >
                                                    <svg
                                                        className="w-6 h-6 text-gray-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <circle cx="12" cy="5" r="2"></circle>
                                                        <circle cx="12" cy="12" r="2"></circle>
                                                        <circle cx="12" cy="19" r="2"></circle>
                                                    </svg>
                                                </button>

                                                {/* Dropdown Menu */}
                                                {isPostOpen && (
                                                    <div
                                                        className="absolute  mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                                                        role="menu"
                                                        aria-orientation="vertical"
                                                        aria-labelledby="menu-button"
                                                    >
                                                        <div className="py-1" role="none">
                                                            <button
                                                                onClick={() => {
                                                                    toggleModel();
                                                                }}
                                                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                                                role="menuitem"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handlePostDelete(postData.post_id)}
                                                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                                                role="menuitem"
                                                            >
                                                                Delete
                                                            </button>
                                                           
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            :
                                            <div className="ml-auto px-4 py-2  text-white font-semibold rounded-lg">
                                            {/* 3 Dots Button */}
                                            <button
                                                onClick={toggleMenu}
                                                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                                            >
                                                <svg
                                                    className="w-6 h-6 text-gray-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle cx="12" cy="5" r="2"></circle>
                                                    <circle cx="12" cy="12" r="2"></circle>
                                                    <circle cx="12" cy="19" r="2"></circle>
                                                </svg>
                                            </button>

                                            {/* Dropdown Menu */}
                                            {isPostOpen && (
                                                <div
                                                    className="absolute  mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    aria-labelledby="menu-button"
                                                >
                                                    <div className="py-1" role="none">
                                                        <button
                                                            onClick={() => {
                                                                toggleReportModel();
                                                            }}
                                                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                                            role="menuitem"
                                                        >
                                                            Report
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    }


                                </address>
                                <a href={postData.link} target="_blank" rel="noopener noreferrer">
                                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{postData.title}</h1>
                                </a>
                            </header>
                            <p className="lead text-gray-200">{postData.content}</p>
                            <a href={postData.link} target="_blank" rel="noopener noreferrer">
                                <figure className='mt-6'>
                                    <img src={postData.postimage} alt="" className="w-full h-96 object-cover" />
                                </figure>
                            </a>


                            <div className="flex items-center mt-5 p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-800">
                                {
                                    postData.like ?
                                        <button type="button" onClick={() => handleLikeClick(postData.post_id)} className=" hover:text-blue-700 border hover:border-blue-700 hover:bg-transparent text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500  dark:text-white dark:focus:ring-blue-800 dark:bg-blue-500">
                                            <svg className=" w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                                            </svg>
                                            <span className="sr-only">Icon description</span>
                                            <span className="sr-only">Like</span>

                                            {/* Add like count here */}
                                            <span className="ml-2 text-sm font-medium">{postData.like_count}</span>
                                        </button>
                                        :
                                        <button type="button" onClick={() => handleLikeClick(postData.post_id)} className=" text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                                            <svg className=" w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                                            </svg>
                                            <span className="sr-only">Icon description</span>
                                            <span className="sr-only">Like</span>

                                            {/* Add like count here */}
                                            <span className="ml-2 text-sm font-medium">{postData.like_count}</span>
                                        </button>
                                }


                                <a
                                    className="text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M9 0C4.03 0 0 3.58 0 8c0 1.33.38 2.58 1.02 3.65-.13.68-.43 2.04-1.02 3.03 0 0 1.83-.17 3.23-1.12.45-.32.95-.58 1.5-.79C6.74 13.66 7.85 14 9 14c4.97 0 9-3.58 9-8s-4.03-8-9-8Z" />
                                    </svg>
                                    <span className="sr-only">Like</span>

                                    {/* Add like count here */}
                                    <span className="ml-2 text-sm font-medium">{postData.comment_count}</span>
                                </a>
                            </div>

                            <section className="not-format">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white mt-6">Discussion</h2>
                                </div>
                                <form className="mb-6">
                                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border  dark:bg-gray-800 dark:border-gray-700">
                                        <label className="sr-only">Your comment</label>
                                        <textarea id="comment"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            className="px-0 w-full text-sm text-white-900 border-0  dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                            placeholder="Write a comment..." required></textarea>

                                    </div>

                                    <div className="flex items-center justify-end">
                                        <button type="button" onClick={() => handleCommentClick(postData.post_id)} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
                                    </div>

                                </form>
                                {postData.comments.map((data) =>
                                    <article key={data.comment_id} className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                        <footer className="flex justify-between items-center mb-2">
                                            {
                                                data.user_profile ?
                                                    <div className="flex items-center">
                                                        <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><img
                                                            className="mr-2 w-6 h-6 rounded-full"
                                                            src={data.user_profile}
                                                            alt="Michael Gough" />{data.full_name}</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400"><time
                                                            title="February 8th, 2022">{data.date}</time></p>
                                                    </div>

                                                    :
                                                    <div className="flex items-center">
                                                        <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><img
                                                            className="mr-2 w-6 h-6 rounded-full"
                                                            src="https://via.placeholder.com/40"
                                                            alt="Michael Gough" />{data.full_name}</p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400"><time
                                                            title="February 8th, 2022">{data.date}</time></p>
                                                    </div>

                                            }

                                            {
                                                data.user_id == userId ?
                                                    <button
                                                        onClick={() => handleCommentDelete(data.comment_id)}
                                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                        type="button">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-500 foc:text-red-700 cursor-pointer">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m2 0h.01M9 17h6m2 0h.01M9 9h6m2 0h.01M5 6h14M4 6h16M6 6V4a1 1 0 011-1h10a1 1 0 011 1v2M6 6h12M9 6V4m6 0v2" />
                                                        </svg>
                                                        <span className="sr-only">Delete</span>
                                                    </button>
                                                    :
                                                    <p></p>
                                            }


                                        </footer>
                                        <p className='text-blue-800'>{`@${postData.full_name}`}</p>
                                        <p className='text-white'>{data.content}</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                            <button type="button"
                                                onClick={() => handleReplyClick(data.comment_id)}
                                                className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                                                <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                    <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                                                </svg>
                                                Reply
                                            </button>
                                            <button type="button"
                                                onClick={() => handleReplyListClick(data.comment_id)}
                                                className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                                                <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                    <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                                                </svg>
                                                {data.reply_count} Replies
                                            </button>
                                        </div>
                                        {replyInputCommentId === data.comment_id && (
                                            <form className="mb-6 mt-6">
                                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border dark:bg-gray-800 dark:border-gray-700">
                                                    <label className="sr-only">Your comment</label>
                                                    <textarea
                                                        id="replay"
                                                        value={replay}
                                                        onChange={(e) => setReplay(e.target.value)}
                                                        className="px-0 w-full text-sm text-white-900 border-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                                        placeholder="Write a comment..."
                                                        required
                                                    ></textarea>
                                                </div>

                                                <div className="flex items-center justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleReplayComment(data.comment_id, data.full_name, data.user_id)}
                                                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>

                                        )}
                                        {replyInputReplyListId === data.comment_id && (
                                            <div>
                                                {data.replies && data.replies.length > 0 && (
                                                    <div className="pl-6">
                                                        {data.replies.map((replydata: any) => (
                                                            <article key={replydata.replay_id} className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                                                                <footer className="flex justify-between items-center mb-2">
                                                                    {replydata.user_profile ?
                                                                        <div className="flex items-center">
                                                                            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">

                                                                                <img
                                                                                    className="mr-2 w-6 h-6 rounded-full"
                                                                                    src={replydata.user_profile}
                                                                                    alt="Jese Leos" />{replydata.full_name}</p>
                                                                            <p className="text-sm text-gray-600 dark:text-gray-400"><time
                                                                                title="February 12th, 2022">{replydata.date}</time></p>

                                                                        </div>
                                                                        :
                                                                        <div className="flex items-center">
                                                                            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">

                                                                                <img
                                                                                    className="mr-2 w-6 h-6 rounded-full"
                                                                                    src="https://via.placeholder.com/40"
                                                                                    alt="Jese Leos" />{replydata.full_name}</p>
                                                                            <p className="text-sm text-gray-600 dark:text-gray-400"><time
                                                                                title="February 12th, 2022">{replydata.date}</time></p>

                                                                        </div>
                                                                    }
                                                                    {
                                                                        replydata.user_id == userId ?
                                                                            <button
                                                                                onClick={() => handleReplayDelete(replydata.replay_id)}
                                                                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                                                type="button">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-500 foc:text-red-700 cursor-pointer">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m2 0h.01M9 17h6m2 0h.01M9 9h6m2 0h.01M5 6h14M4 6h16M6 6V4a1 1 0 011-1h10a1 1 0 011 1v2M6 6h12M9 6V4m6 0v2" />
                                                                                </svg>
                                                                                <span className="sr-only">Delete</span>
                                                                            </button>
                                                                            :
                                                                            <p></p>

                                                                    }

                                                                    <div id="dropdownComment2"
                                                                        className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                                            aria-labelledby="dropdownMenuIconHorizontalButton">
                                                                            <li>
                                                                                <a href="#"
                                                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#"
                                                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#"
                                                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </footer>
                                                                <p className='text-blue-800'>{`@${replydata.mention_user}`}</p>
                                                                <p className='text-white'>{replydata.content}</p>
                                                                <div className="flex items-center mt-4 space-x-4">
                                                                    <button type="button"
                                                                        onClick={() => handleReplyReplyClick(replydata.replay_id)}
                                                                        className="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                                                                        <svg className="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                                            <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                                                                        </svg>
                                                                        Reply
                                                                    </button>
                                                                </div>
                                                                {replyInputReplyId === replydata.replay_id && (
                                                                    <form className="mb-6 mt-6">
                                                                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border dark:bg-gray-800 dark:border-gray-700">
                                                                            <label className="sr-only">Your comment</label>
                                                                            <textarea
                                                                                id="replay"
                                                                                value={replay}
                                                                                onChange={(e) => setReplay(e.target.value)}
                                                                                className="px-0 w-full text-sm text-white-900 border-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                                                                placeholder="Write a comment..."
                                                                                required
                                                                            ></textarea>
                                                                        </div>

                                                                        <div className="flex items-center justify-end">
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleReplayComment(data.comment_id, replydata.full_name, replydata.user_id)}
                                                                                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                                                            >
                                                                                Submit
                                                                            </button>
                                                                        </div>
                                                                    </form>

                                                                )}
                                                            </article>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    </article>
                                )}


                            </section>
                        </article>
                    </div>
            }

            {isOpen && (
                <div
                    id="crud-modal"
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
                    aria-hidden="true"
                >
                    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
                        <div className="w-full max-w-3xl bg-gray-950 rounded-lg shadow-lg mt-20">

                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-2xl font-bold text-white text-center mb-6  mt-10">
                                    Update Post
                                </h3>
                                <button
                                    onClick={toggleModel}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Sign Up Form */}

                            <form onSubmit={handleSubmit}>
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
                                        value={updateData.title ? updateData.title : ""}
                                        onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
                                        placeholder="Enter Title"
                                        className="w-full px-3 py-2 bg-slate-900 border-l-2 border-red-500   rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
                                    />
                                </div>

                                <div className="col-span-2 mb-2">

                                    <textarea
                                        id="description"
                                        name="description"
                                        value={updateData?.content ? updateData.content : ''}
                                        onChange={(e) => setUpdateData({ ...updateData, content: e.target.value })}
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
                                        value={updateData?.link ? updateData.link : ""}
                                        onChange={(e) => setUpdateData({ ...updateData, link: e.target.value })}
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
                                        id="file_input"
                                        type="file"
                                        onChange={(e) => setUpdateData({ ...updateData, postImage: e.target.files?.[0] ?? null })}
                                        aria-describedby="file_input_help"
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
            )}
            {isReportOpen && (
                <div
                    id="crud-modal"
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
                    aria-hidden="true"
                >
                    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
                        <div className="w-full max-w-3xl bg-gray-950 rounded-lg shadow-lg mt-20">

                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-2xl font-bold text-white text-center mb-6  mt-10">
                                    Report Post
                                </h3>
                                <button
                                    onClick={toggleReportModel}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Sign Up Form */}

                            <form >
                                {/* Email Input */}


                                <div className="col-span-2 mb-2">

                                    <textarea
                                        id="reson"
                                        name="description"
                                        value={report}
                                        onChange={(e) => setReport(e.target.value)}
                                        rows={10}
                                        className="block p-3 w-full  bg-slate-900 text-smbg-slate-900 border-l-2 border-red-500   rounded-md focus:outline-none  placeholder-white text-white focus:border-white focus:bg-slate-800"
                                        placeholder="Share your Reson"
                                    />
                                </div>
                                <button
                                    onClick={()=>handleReportSubmit(postData.post_id)}
                                    type="button"
                                    className="w-full bg-white text-Black py-2 rounded-md font-semibold hover:bg-gray-300 focus:outline-none  focus:ring-offset-2 focus:border-white focus:bg-gray-400 mb-9 mt-3"
                                >
                                    Submit
                                </button>
                            </form>


                        </div>
                        <div />
                    </div>
                </div>
            )}

        </div>
    )
}
