import React, { useEffect, useState } from 'react'
import { UserHeader } from '../home/UserHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store/store';
import { AxiosResponse } from 'axios';
import { ProfileList, ProfileListUpdate } from '../../../utils/interfaces';
import { UserData, UserUpdate, postLikeApi, userFollow } from '../../../Api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserProfileLoading from '../../Loading/UserProfileLoading';
import UserHomeLoading from '../../Loading/UserHomeLoading';


export const Profile: React.FC = () => {



  // Initialize all values


  const [profileData, setProfileData] = useState<ProfileList>();
  const [reloadProfile, setReloadProfile] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<ProfileListUpdate>({
    full_name: "",
    bio: "",
    location: "",
    dob: "",
    profileImage: null,
    coverImage: null,
    username: '',
    id: ''
  });



  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const usertoken: string | null = useSelector((state: RootState) => state.auth.user_token)
  const userId: string = useSelector((state: RootState) => state.auth.userId)
  const navigate = useNavigate()
  const location = useLocation()


  // Set headers for auth


  const headers = {
    Authorization: `Bearer ${usertoken}`,
    'Content-Type': 'multipart/form-data',
  };



  const handleGetPost = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    const postId = e.currentTarget.id;
    navigate('/viewpost', { state: { postId: postId } })
  }


  // Updata toggle bar closed and open



  const toggleModel = () => {

    setIsOpen(!isOpen)
  };


  // Updata profile



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("datadata",updateData)
    e.preventDefault()
    try {
      const response: AxiosResponse<any> = await UserUpdate(updateData, headers);
      console.log(response.data)
      setIsOpen(!isOpen)
      toast.success(response.data)
      setReloadProfile(prev => !prev);
    } catch {
      toast.error("Updation is not successfull")
    }

  }


  //  User Follow


  const handleFollow = async (userId: string, followUserId: string) => {
    if (userId === followUserId) {
      toast.error("You cannot follow yourself !!!.")
      return
    }

    const updatedPost = {
      ...profileData, follow: !profileData?.follow,
      followers_count: profileData?.follow ? profileData.followers_count - 1 : profileData?.followers_count + 1
    };
    setProfileData(updatedPost);

    try {
      const response: AxiosResponse<any> = await userFollow(userId, followUserId, headers)
      console.log(response.data)
      toast.success(response.data.message[0])
    } catch (error) {
      console.log(error)
    }
  }


  // Like post


  const handleLikeClick = async (postId: string) => {
    setProfileData((prevProfileData) => {
      if (!prevProfileData) return prevProfileData;

      const updatedPostList = prevProfileData.posts.map((post) => {
        if (post.post_id === postId) {
          return {
            ...post,
            like: !post.like,
            like_count: post.like ? post.like_count - 1 : post.like_count + 1
          };
        }
        return post;
      });

      return { ...prevProfileData, posts: updatedPostList };
    });

    try {
      const response: AxiosResponse<any> = await postLikeApi(postId, userId, headers)
      console.log(response.data)

    } catch (error) {
      console.error("Error", error)
    }
  }





  // Get profile data



  useEffect(() => {
    setLoading(true)
    const profileId = location.state.profileId
    console.log("profileIdddd", profileId)
    const profileDataCall = async () => {
      try {
        const response: AxiosResponse<any> = await UserData(userId, profileId, headers);
        console.log(response.data)
        setProfileData(response.data)
        setTimeout(() => {
          setLoading(false)
        }, 1000)

      } catch {
        console.log("The data is did't fetch")
      }
    }

    profileDataCall()

  }, [reloadProfile])


  // Initialize profile updata data



  useEffect(() => {
    if (profileData) {
      setUpdateData((prevData) => ({
        ...prevData,
        username: profileData?.username,
        full_name: profileData?.full_name,
        bio: profileData?.bio,
        dob: profileData?.dob,
        location: profileData?.location,
        profileImage: profileData?.profileImage,
        coverImage: profileData?.profileImage,
        userId: profileData?.id
      }));
    }


  }, [profileData]);



  // User view 

  return (
    <div>
      <UserHeader />
      <ToastContainer />
      {
        loading ?
          <div>
            <UserProfileLoading />
            <UserHomeLoading />
          </div>

          :
          <>
            <section className="relative block h-[500px]">
              {profileData?.coverImage ?
                <div
                  className="absolute top-0 w-full h-full bg-center "

                  style={{
                    backgroundImage:
                      `url('${profileData.coverImage}')`,
                  }}
                >
                  <span
                    id="blackOverlay"
                    className="w-full h-full absolute opacity-50 bg-black"
                  ></span>
                </div>
                :
                <div
                  className="absolute top-0 w-full h-full bg-center bg-cover"

                  style={{
                    backgroundImage:
                      "url('https://www.magicdigitalalbum.com/photos/photo-not-available.jpg')",
                  }}
                >
                  <span
                    id="blackOverlay"
                    className="w-full h-full absolute opacity-50 bg-black"
                  ></span>
                </div>
              }

            </section>
            <section className="relative py-16 bg-gray-800">
              <div className="container mx-auto bg-gray-800 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-6 shadow-xl rounded-lg -mt-64 pb-6">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div className="relative">

                          {profileData?.profileImage ?

                            <img
                              alt="Profile"
                              src={profileData.profileImage}
                              className="shadow-xl border-4 border-white rounded-full align-middle h-[200px] w-[200px]   mb-20 "
                            />
                            :
                            <img
                              alt="..."
                              src="https://cdn.create.vista.com/api/media/small/251895389/stock-photo-person-symbol-icon-circle"
                              className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                            />
                          }

                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        {
                          profileData?.id === userId ?
                            <div className="py-6 px-3 mt-32 sm:mt-0">
                              <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={toggleModel}
                              >
                                Edit
                              </button>
                            </div>
                            :
                            profileData?.follow ?
                              <div className="py-6 px-3 mt-32 sm:mt-0">
                                <button
                                  className="border-2 border-pink-600 focus:border-none focus:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => {
                                    if (profileData?.id) {
                                      handleFollow(userId, profileData.id);
                                    } else {
                                      toast.error("Profile ID is missing");
                                    }
                                  }}
                                >
                                  Unfollow
                                </button>
                              </div>
                              :
                              <div className="py-6 px-3 mt-32 sm:mt-0">
                                <button
                                  className="bg-pink-500 focus:bg-transparent uppercase focus:border-2 focus:border-pink-600 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => {
                                    if (profileData?.id) {
                                      handleFollow(userId, profileData.id);
                                    } else {
                                      toast.error("Profile ID is missing");
                                    }
                                  }}
                                >
                                  Follow
                                </button>
                              </div>

                        }



                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
                              {profileData?.followers_count}
                            </span>
                            <span className="text-sm text-gray-300">Followers</span>
                          </div>
                          <div className="lg:mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
                              {profileData?.following_count}
                            </span>
                            <span className="text-sm text-gray-300">Following</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-300">
                        {profileData?.full_name}
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-gray-300 font-bold ">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-300"></i>
                        {profileData?.username ? profileData.username : "Username not provided"}
                      </div>
                      <div className="mb-2 text-gray-300 mt-10">
                        <i className="fas fa-briefcase mr-2 text-lg text-gray-300"></i>
                        {profileData?.location ? profileData.location : "Location not provided"}
                      </div>
                      <div className="mb-2 text-gray-300">
                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                        {profileData?.dob ? profileData.dob : "Date of birth not provided"}
                      </div>
                      <div className="mb-2 text-gray-300">
                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                        {profileData?.bio ? profileData.bio : "Bio not provided"}
                      </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-gray-500 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <p className="mb-4 text-lg leading-relaxed text-gray-300">
                            Posts
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 pl-5 pr-5 mt-8">
                    {profileData?.posts.map((card) => (

                      <div
                        key={card.post_id}
                        className=" relative group max-w-sm bg-white border border-gray-600 rounded-lg shadow dark:bg-zinc-800 hover:border-gray-100"


                      >
                        <div className='flex justify-between'>

                          <button className="flex items-center focus:outline-none pl-3 pt-3">


                            <img
                              className="h-8 w-8 rounded-full border-2 border-gray-500"
                              src={card.profileimage ? card.profileimage : "https://via.placeholder.com/40"}
                              alt={card.title ? card.title : "Profile"}
                            />
                          </button>
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
                            <h5 className="mb-1  text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2">
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


              <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                <div className="container mx-auto px-4">
                  <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                      <div className="text-sm text-blueGray-500 font-semibold py-1">
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </section>

            {isOpen && (
              <div
                id="crud-modal"
                className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
                aria-hidden="true"
              >
                <div className="relative p-4 w-full max-w-md max-h-full">
                  {/* Modal content */}
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Edit profile
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
                    {/* Modal body */}
                    <form onSubmit={handleSubmit} className="p-4 md:p-5">
                      <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={updateData?.full_name ? updateData.full_name : ""}
                            onChange={(e) => setUpdateData({ ...updateData, full_name: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type product name"
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Location
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={(e) => setUpdateData({ ...updateData, location: e.target.value })}
                            value={updateData?.location ? updateData.location : ""}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type product name"
                            required
                          />
                        </div>

                        <div className="col-span-2">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Date Of Birth
                          </label>
                          <input
                            type="date"
                            name="name"
                            id="name"
                            value={updateData?.dob ? updateData.dob : "Plese Select dob"}
                            onChange={(e) => setUpdateData({ ...updateData, dob: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Type product name"
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <label
                            htmlFor="description"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Bio
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            onChange={(e) => setUpdateData({ ...updateData, bio: e.target.value })}
                            value={updateData?.bio ? updateData.bio : ''}
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write product description here"
                          />
                        </div>
                        <div className="col-span-2">
                          <div className="w-full max-w-sm mx-auto">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                              Profile Image
                            </label>
                            <input
                              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                              id="file_input"
                              type="file"
                              onChange={(e) => setUpdateData({ ...updateData, profileImage: e.target.files?.[0] ?? null })}
                              aria-describedby="file_input_help"
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                              SVG, PNG, JPG or GIF (MAX. 800x400px).
                            </p>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="w-full max-w-sm mx-auto">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                              Cover Image
                            </label>
                            <input
                              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                              id="file_input"
                              type="file"
                              onChange={(e) => setUpdateData({ ...updateData, coverImage: e.target.files?.[0] ?? null })}
                              aria-describedby="file_input_help"
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                              SVG, PNG, JPG or GIF (MAX. 800x400px).
                            </p>
                          </div>
                        </div>


                      </div>
                      <button
                        type="submit"
                        className=" mt-3 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Submit
                      </button>

                    </form>
                  </div>
                </div>
              </div>
            )}
          </>

      }

    </div>
  );

}
