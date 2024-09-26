import React, { useEffect, useState } from 'react';
import { UserHeader } from './UserHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllPostData } from '../../../utils/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store/store';
import { AxiosResponse } from 'axios';
import { postListApi } from '../../../Api/api';
import { useNavigate } from 'react-router-dom';
import { postLikeApi } from '../../../Api/api';

export const UserHome: React.FC = () => {

  const [postList, setPostList] = useState<AllPostData[]>([]);
  const userToken: string | null = useSelector((state: RootState) => state.auth.user_token)
  const userId: string = useSelector((state: RootState) => state.auth.userId)
  const navigate = useNavigate()






  // Set headers for auth

  const headers = {
    Authorization: `Bearer ${userToken}`,
    'Content-type': 'application/json',
  };


  // Fetch all user data


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<AllPostData[]> = await postListApi(userId, headers);
        console.log(response.data)
        setPostList(response.data)
      } catch {
        console.log("The data is did't fetch")
      }
    }

    fetchData()
  }, [])



  const handleGetPost = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    const postId = e.currentTarget.id;
    navigate('/viewpost', { state: { postId: postId } })
  }




  const handleGetProfile = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
    e.preventDefault()
    const profileId = e.currentTarget.id;
    navigate('/profile', {state: {profileId: profileId}})
}


  // Like post


  const handleLikeClick = async (postId: string) => {
    const updatedPostList = postList.map((post) => {
      if (post.post_id === postId) {
        return {
          ...post, like: !post.like,
          like_count: post.like ? post.like_count - 1 : post.like_count + 1
        };
      }
      return post;
    });

    setPostList(updatedPostList);
    try {
      const response: AxiosResponse<any> = await postLikeApi(postId, userId, headers)
      console.log(response.data)

    } catch (error) {
      console.error("Error", error

      )
    }
  }




  // User view  

  return (
    <div>
      <UserHeader />
      <ToastContainer />
      <div className="p-6 min-h-screen bg-zinc-900">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-5 pr-5 mt-8">
          {postList.map((card) => (

            <div
              key={card.post_id}
              className=" relative group max-w-sm bg-white border border-gray-600 rounded-lg shadow dark:bg-zinc-800 hover:border-gray-100"


            >
              <div className='flex justify-between'>

                <a 
                id={card.user_id} onClick={handleGetProfile}
                className="flex items-center focus:outline-none pl-3 pt-3">


                
                  <img
                    className="h-8 w-8 rounded-full border-2 border-gray-500"
                    src={card.profileimage ? card.profileimage : "https://via.placeholder.com/40"}
                    alt={card.title ? card.title : "Profile"}
                  />
                </a>
                <a id={card.post_id} onClick={handleGetPost}

                  className="inline-flex items-center px-3 py-2 mt-3 mr-3 text-sm text-center bg-white rounded-xl text-black font-bold opacity-0 group-hover:opacity-100 cursor-pointer "
                >
                  Read Post

                </a>
              </div>

              <a href="#">
                {card.postimage && (
                  <img
                    className="rounded-t-lg w-full h-40 object-cover p-3"
                    src={card.postimage}
                    alt={card.title}
                  />
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
                  {
                    card.like ?
                      <button type="button" onClick={() => handleLikeClick(card.post_id)} className=" hover:text-blue-700 border hover:border-blue-700 hover:bg-transparent text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500  dark:text-white dark:focus:ring-blue-800 dark:bg-blue-500">
                        <svg className=" w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                          <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                        </svg>
                        <span className="sr-only">Icon description</span>
                        <span className="sr-only">Like</span>

                        {/* Add like count here */}
                        <span className="ml-2 text-sm font-medium">{card.like_count}</span>
                      </button>
                      :
                      <button type="button" onClick={() => handleLikeClick(card.post_id)} className=" text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                        <svg className=" w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                          <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                        </svg>
                        <span className="sr-only">Icon description</span>
                        <span className="sr-only">Like</span>

                        {/* Add like count here */}
                        <span className="ml-2 text-sm font-medium">{card.like_count}</span>
                      </button>
                  }



                  <a
                    id={card.post_id}
                    onClick={handleGetPost}
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
                    <span className="ml-2 text-sm font-medium">{card.comment_count}</span>
                  </a>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
