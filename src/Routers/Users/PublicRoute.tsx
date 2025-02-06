import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../redux/Store/store'

const PublicRoute = () => {
    const access = useSelector((state: RootState) => state.auth.user_token)
    const refresh = useSelector((state: RootState) => state.auth.user_refresh_token)

    return access || refresh ? <Navigate to='/Home' /> : <Outlet />
}

export default PublicRoute;