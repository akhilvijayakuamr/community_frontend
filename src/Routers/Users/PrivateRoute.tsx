
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../redux/Store/store'

const PrivateRoute =()=> {
   const access = useSelector((state:RootState)=>state.auth.user_token)
   const refresh = useSelector((state:RootState)=>state.auth.user_refresh_token)

   return access || refresh ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute