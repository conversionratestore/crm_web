import { useLocation, Navigate, Outlet } from 'react-router-dom'
import React from "react"
import {useAuth} from "../Hooks/useAuth"

const CheckAuth = () => {
    const location = useLocation()
    const {token} = useAuth()

    if(!token) {
        return <Navigate to="/login" state={{from: location}} replace={true} />
    }

    return <Outlet />
}

export { CheckAuth }
