import React, { useEffect, useState } from 'react'
import { UserHeader } from '../home/UserHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store/store';
import { AxiosResponse } from 'axios';
import { ProfileList } from '../../../utils/interfaces';
import { UserData, UserUpdate } from '../../../Api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Profile: React.FC = () => {



  // Initialize all values


  const [profileData, setProfileData] = useState<ProfileList>();
  const [updateData, setUpdateData] = useState<ProfileList>({
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
  const usertoken: string | null = useSelector((state: RootState) => state.auth.user_token)
  const userId: string = useSelector((state: RootState) => state.auth.userId)


  // Set headers for auth


  const headers = {
    Authorization: `Bearer ${usertoken}`,
    'Content-Type': 'multipart/form-data',
  };


  // Updata toggle bar closed and open
  


  const toggleModel = () => {
    setIsOpen(!isOpen)
  };


  // Updata profile



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response: AxiosResponse<any> = await UserUpdate(updateData, headers);
      console.log(response.data)
      setIsOpen(!isOpen)
      toast.success(response.data)
    } catch {
      toast.error("Updation is not successfull")
    }

  }




  // Get profile data



  useEffect(() => {
    const profileDataCall = async () => {
      try {
        const response: AxiosResponse<any> = await UserData(userId, headers);
        console.log(response.data)
        setProfileData(response.data)
      } catch {
        console.log("The data is did't fetch")
      }
    }



    profileDataCall()

  }, [])


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
      <section className="relative block h-[500px]">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">

                    {profileData?.profileImage ?

                      <img
                        alt="Profile"
                        src={profileData.profileImage}
                        className="shadow-xl rounded-full align-middle h-[200px] w-[200px]   mb-20 ml-20 "
                      />
                      :
                      <img
                        alt="..."
                        src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                      />
                    }

                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={toggleModel}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">Follows</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Post</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">Following</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {profileData?.full_name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {profileData?.username ? profileData.username : "Username not provided"}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  {profileData?.location ? profileData.location : "Location not provided"}
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {profileData?.dob ? profileData.dob : "Date of birth not provided"}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {profileData?.bio ? profileData.bio : "Bio not provided"}
                    </p>
                    {/* <a
                      href="#pablo"
                      className="font-normal text-pink-500"
                    >
                      Show more
                    </a> */}
                  </div>
                </div>
              </div>
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
                      value={updateData?.full_name ? updateData.full_name : "Plese Enter Full name"}
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
                        Upload file
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
                        Upload file
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
    </div>
  );

}