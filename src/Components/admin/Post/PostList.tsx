import React, { useState, useEffect } from 'react'
import { AllPostAdminData, AllPostData } from '../../../utils/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store/store';
import { AxiosResponse } from 'axios';
import { postAdminiListApi, postHide, postListApi } from '../../../Api/api';
import { toast, ToastContainer } from 'react-toastify'
import { Header } from '../Home/Header';
import { List } from '@mui/material';
import UserHomeLoading from '../../Loading/UserHomeLoading';


export const PostList: React.FC = () => {

    const [postList, setPostList] = useState<AllPostAdminData[]>([]);
    const [displayList, setDisplayList] = useState<AllPostAdminData[]>([]);
    const [deletePostList, setDeletePostList] = useState<AllPostAdminData[]>([]);
    const [hidePostList, setHidePostList] = useState<AllPostAdminData[]>([]);
    const [reportPostList, setReportPostList] = useState<AllPostAdminData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [imgLoading, setImgLoading] = useState<boolean>(false);
    const adminToken: string | null = useSelector((state: RootState) => state.auth.admin_token)
    const [isReport, setIsReport] = useState<boolean>(false);
    const [report, setReport] = useState<any[]>([]);


    // Set headers for auth

    const headers = {
        Authorization: `Bearer ${adminToken}`,
        'Content-type': 'application/json',
    };


    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const response: AxiosResponse<AllPostAdminData[]> = await postAdminiListApi(headers);
                console.log(response.data)
                const allPost = response.data.filter(response => response.is_block === false && response.is_delete === false)
                const deletePost = response.data.filter(response => response.is_delete === true)
                const hidePost = response.data.filter(response => response.is_block === true)
                const reportPost = response.data.filter(response => response.is_report === true)
                setDisplayList(allPost)
                setPostList(allPost)
                setDeletePostList(deletePost)
                setHidePostList(hidePost)
                setReportPostList(reportPost)
                setLoading(false)
                setImgLoading(true)
                setTimeout(() => {
                    setImgLoading(false)
                }, 3000)
            } catch {
                console.log("The data is did't fetch")
            }
        }

        fetchData()
    }, [])


    const handleHide = async (postId: string) => {
        try {
            const response: AxiosResponse<any> = await postHide(postId, headers);
            toast.success(response.data)
            let hideItem = postList.find((item) => item.post_id === postId)
            let unHideItem = hidePostList.find((item) => item.post_id === postId)
            if (hideItem) {
                setPostList(postList.filter((item) => item.post_id !== postId))
                setDisplayList(postList.filter((item) => item.post_id !== postId))
                hideItem = { ...hideItem, is_block: true }
                setHidePostList([...hidePostList, hideItem])
                hideItem = undefined
            }
            if (unHideItem) {
                setHidePostList(hidePostList.filter((item) => item.post_id !== postId))
                setDisplayList(hidePostList.filter((item) => item.post_id !== postId))
                unHideItem = { ...unHideItem, is_block: false }
                setPostList([...postList, unHideItem])
                unHideItem = undefined

            }

        } catch {
            toast.error("Deletion is not successfull")
        }
    }

    const handleSelectList = (ListData: string) => {
        if (ListData === 'all_post') {
            setDisplayList(postList)
        }
        if (ListData === 'delete_post') {
            setDisplayList(deletePostList)
        }
        if (ListData === 'hide_post') {
            setDisplayList(hidePostList)
        }
        if (ListData === 'report_post') {
            setDisplayList(reportPostList)
        }
    }


    const openReport = () => {
        setIsReport(!isReport)
    }

    const disReport = (postId: string) => {
        let reportData = reportPostList.find((item) => item.post_id === postId)
        setReport(reportData?.reports ? reportData.reports : [])
        openReport()
        console.log(report)
    }



    return (
        <div>

            <Header />
            {
                loading ?
                    <UserHomeLoading />
                    :
                    <>
                        <ToastContainer />
                        <div className="p-6 min-h-screen bg-zinc-900">
                            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                                <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
                                    <div className="hidden justify-center items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                            <li>
                                                <a href="#" onClick={(e) => {
                                                    e.preventDefault()
                                                    handleSelectList('all_post')
                                                }} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">All Posts</a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={(e) => {
                                                    e.preventDefault()
                                                    handleSelectList('delete_post')
                                                }} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Deleted Posts</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleSelectList('hide_post')
                                                    }}
                                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Hide Posts</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleSelectList('report_post')
                                                    }}
                                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Reported Posts</a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </nav>
                            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-5 pr-5 mt-8">
                                {displayList.map((card) => (

                                    <div key={card.post_id}

                                        className=" relative group max-w-sm bg-white border border-gray-600 rounded-lg shadow dark:bg-zinc-800 hover:border-gray-100"


                                    >
                                        <div className='flex justify-between'>

                                            <a

                                                className="flex items-center focus:outline-none pl-3 pt-3">



                                                <img
                                                    className="h-8 w-8 rounded-full border-2 border-gray-500"
                                                    src={card.profileimage ? card.profileimage : "https://via.placeholder.com/40"}
                                                    alt={card.title ? card.title : "Profile"}
                                                />


                                            </a>
                                            {
                                                card.is_report ?
                                                    <>
                                                          <div>
                                                                {card.is_block ?
                                                                    <a

                                                                        onClick={() => handleHide(card.post_id)}

                                                                        className="inline-flex items-center px-3 py-2 mt-3 mr-3 text-sm text-center bg-green-700 rounded-xl text-black font-bold border border-white cursor-pointer "
                                                                    >
                                                                        UnHide

                                                                    </a>
                                                                    :
                                                                    <a
                                                                        onClick={() => handleHide(card.post_id)}
                                                                        className="inline-flex items-center px-3 py-2 mt-3 mr-3 text-sm text-center bg-red-700 rounded-xl text-black font-bold border border-white  cursor-pointer "
                                                                    >
                                                                        Hide

                                                                    </a>

                                                                }
                                                            </div>
                                                        <a


                                                            onClick={() => disReport(card.post_id)}
                                                            className="inline-flex items-center px-3 py-2 mt-3 mr-3 text-sm text-center bg-yellow-300 rounded-xl text-black font-bold border border-white cursor-pointer "
                                                        >
                                                            View Reports

                                                        </a>
                                                    </>

                                                    :
                                                    <>
                                                        {card.is_delete ?


                                                            <p></p>
                                                            :
                                                            <div>
                                                                {card.is_block ?
                                                                    <a

                                                                        onClick={() => handleHide(card.post_id)}

                                                                        className="inline-flex items-center px-3 py-2 mt-3 mr-3 text-sm text-center bg-green-700 rounded-xl text-black font-bold border border-white cursor-pointer "
                                                                    >
                                                                        UnHide

                                                                    </a>
                                                                    :
                                                                    <a
                                                                        onClick={() => handleHide(card.post_id)}
                                                                        className="inline-flex items-center px-3 py-2 mt-3 mr-3 text-sm text-center bg-red-700 rounded-xl text-black font-bold border border-white  cursor-pointer "
                                                                    >
                                                                        Hide

                                                                    </a>

                                                                }
                                                            </div>
                                                        }

                                                    </>
                                            }



                                        </div>
                                        <a href="#">
                                            {card.postimage && (

                                                <>


                                                    {
                                                        imgLoading ?
                                                            <div role="status" className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                                                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                                                                </svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            :
                                                            <img
                                                                className="rounded-t-lg w-full h-40 object-cover p-3"
                                                                src={card.postimage}
                                                                alt={card.title}
                                                            />
                                                    }

                                                </>

                                            )}
                                        </a>
                                        <div className="p-5">
                                            <a href="#">
                                                <h5 className="mb-1  text-base font-bold tracking-tight text-gray-900 dark:text-white li">
                                                    {card.title}
                                                </h5>
                                            </a>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                                                {card.content}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{card.date}</p>


                                            <div className="mt-4 flex items-center justify-between">


                                                <a className=" text-white border border-blue-700    font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 ">
                                                    <span className="ml-2 text-sm font-medium">Like Count {card.like_count}</span>
                                                </a>




                                                <a
                                                    className="text-white border border-green-700  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                                                >



                                                    {/* Add like count here */}
                                                    <span className="ml-2 text-sm font-medium">Comment Count {card.comment_count}</span>
                                                </a>



                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>

            }

            {/* Report Modal */}

            {isReport &&
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative max-h-screen overflow-y-auto">
                        {/* Close Button */}
                        <button onClick={openReport} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto max-h-96">
                            {report.map((data, index) => (
                                <div key={index} className="flex flex-col items-center mb-4">
                                    <img
                                        src={data.user_profile ? data.user_profile : "https://via.placeholder.com/150"}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full shadow-md mb-4"
                                    />
                                    <h2 className="text-xl font-semibold mb-2">{data.full_name}</h2>
                                    <p className="text-black mb-4 font-bold">Reason: {data.reson || "No reason provided"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }


        </div>
    )
}