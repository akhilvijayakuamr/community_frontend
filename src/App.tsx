import ForgotPassword from "./Components/user/auth_forgot/ForgotPassword"
import Login from "./Components/user/auth/Login"
import Mainpage from "./Components/user/home/Mainpage"
import OtpRegister from "./Components/user/register/OtpRegister"
import Register from "./Components/user/register/Register"
import Tag from "./Components/user/register/Tag"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminLogin from "./Components/admin/login/Admin_login"
import { HomeUserList } from "./Components/admin/Home/HomeUserList"
import { AdminDash } from "./Components/admin/Home/AdminDash"
import { UserHome } from "./Components/user/home/UserHome"
import { Profile } from "./Components/user/profile/Profile"
import { ProfileEdit } from "./Components/user/profile/ProfileEdit"
import SetPassword from "./Components/user/auth_forgot/SetPassword"
import { CreatePost } from "./Components/user/post/CreatePost"
import { PostView } from "./Components/user/post/PostView"
import Chat from "./Components/user/chat/Chat"
import { PostList } from "./Components/admin/Post/PostList"
import EmptyChat from "./Components/user/chat/EmptyChat"





export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<Mainpage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user_login' element={<Login />} />
          <Route path='/frogot_password' element={<ForgotPassword />} />
          <Route path='/otp_register' element={<OtpRegister />} />
          <Route path='/intrest' element={<Tag />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/userlist" element={<HomeUserList />} />
          <Route path="/dashboard" element={<AdminDash />} />
          <Route path="/Home" element={<UserHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/forgot" element={<ForgotPassword/>}/>
          <Route path="/changepassword" element={<SetPassword/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
          <Route path="/viewpost" element={<PostView/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/chat_list" element={<EmptyChat/>}/>
          <Route path="/post_list" element={<PostList/>}/>
        </Routes>
      </Router>

    </div>
  )
}

