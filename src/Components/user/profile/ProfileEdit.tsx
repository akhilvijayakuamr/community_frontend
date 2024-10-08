import React from 'react'

export const ProfileEdit:React.FC =()=> {
  return (
    
        <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
          <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
              <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
              <a href="#" className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full">
                Pubic Profile
              </a>
              <a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
                Account Settings
              </a>
              <a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
                Notifications
              </a>
              <a href="#" className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">
                PRO Account
              </a>
            </div>
          </aside>
          <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
            <div className="p-2 md:p-4">
              <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
                <div className="grid max-w-2xl mx-auto mt-8">
                  <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                    <img
                      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300"
                    //   src={profileImage}
                      alt="Profile"
                    />
                    <div className="flex flex-col space-y-5 sm:ml-8">
                      <input
                        type="file"
                        accept="image/*"
                        // onChange={handleProfileImageChange}
                        className="hidden"
                        id="profileImageInput"
                      />
                      <button
                        type="button"
                        // onClick={() => document.getElementById('profileImageInput').click()}
                        className="py-3.5 px-7 text-base font-medium text-indigo-100 bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:ring-4 focus:ring-indigo-200"
                      >
                        Change picture
                      </button>
                      <button
                        type="button"
                        // onClick={() => setProfileImage('')}
                        className="py-3.5 px-7 text-base font-medium text-indigo-900 bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:ring-4 focus:ring-indigo-200"
                      >
                        Delete picture
                      </button>
                    </div>
                  </div>
                  <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                      <div className="w-full">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-indigo-900">Your first name</label>
                        <input
                          type="text"
                          id="first_name"
                        //   valu  // onClick={() => document.getElementById('profileImageInput').click()}e={firstName}
                        //   onChange={(e) => setFirstName(e.target.value)}
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="Your first name"
                          required
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-indigo-900">Your last name</label>
                        <input
                          type="text"
                          id="last_name"
                        //   value={lastName}
                        //   onChange={(e) => setLastName(e.target.value)}
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="Your last name"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900">Your email</label>
                      <input
                        type="email"
                        id="email"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="your.email@mail.com"
                        required
                      />
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label htmlFor="profession" className="block mb-2 text-sm font-medium text-indigo-900">Profession</label>
                      <input
                        type="text"
                        id="profession"
                        // value={profession}
                        // onChange={(e) => setProfession(e.target.value)}
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="Your profession"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="bio" className="block mb-2 text-sm font-medium text-indigo-900">Bio</label>
                      <textarea
                        id="bio"
                        // rows="4"
                        // value={bio}
                        // onChange={(e) => setBio(e.target.value)}
                        className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Write your bio here..."
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        // onClick={handleSubmit}
                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
  )
}
