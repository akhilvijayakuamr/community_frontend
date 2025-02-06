import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../redux/Store/store'

const AdminPublicRoute = () => {
    const access = useSelector((state: RootState) => state.auth.admin_token)
    const refresh = useSelector((state: RootState) => state.auth.admin_refresh_token)
    
    return access || refresh ? <Navigate to='/dashboard' /> : <Outlet />
}

export default AdminPublicRoute;