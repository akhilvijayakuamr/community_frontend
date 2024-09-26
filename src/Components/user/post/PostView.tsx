import React, { useEffect, useState } from 'react'
import { UserHeader } from '../home/UserHeader'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/Store/store'
import { AxiosResponse } from 'axios'
import { UniquePostData, ReplyFormData } from '../../../utils/interfaces'
import { postGetApi, postLikeApi, postCommentApi, postReplayComment } from '../../../Api/api'
import { ToastContainer, toast } from 'react-toastify';


export const PostView: React.FC = () => {
    const location = useLocation()
    const [comment, setComment] = useState<string>('');
    const [replay, setReplay] = useState<string>('');
    const [replyInputCommentId, setReplayInputCommentId] = useState<string | null>(null)
    const [replyInputReplyId, setReplayInputReplyId] = useState<string | null>(null)
    const [replyInputReplyListId, setReplayInputReplyListId] = useState<string | null>(null)
    const [reloadComments, setReloadComments] = useState<boolean>(false);
    const userToken: string | null = useSelector((state: RootState) => state.auth.user_token)
    const userId: string = useSelector((state: RootState) => state.auth.userId)


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



    // Set headers for auth


    const headers = {
        Authorization: `Bearer ${userToken}`,
        'Content-type': 'application/json',
    };


    // Get unique post

    useEffect(() => {
        const postId = location.state.postId
        const fetchData = async () => {
            try {
                const respons: AxiosResponse<UniquePostData> = await postGetApi(postId, userId, headers);
                setPostData(respons.data)
                console.log(respons.data)
            } catch {
                console.log("The data is did't fetch")
            }
        }
        fetchData()

    }, [reloadComments])


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
            setReloadComments(prev => !prev);
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
            setReloadComments(prev => !prev)
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









    return (
        <div>
            <UserHeader />
            <ToastContainer />
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


                                    <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                        type="button">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                        <span className="sr-only">Comment settings</span>
                                    </button>

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

                                                            <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                                                                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                                type="button">
                                                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                                </svg>
                                                                <span className="sr-only">Comment settings</span>
                                                            </button>

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
        </div>
    )
}
