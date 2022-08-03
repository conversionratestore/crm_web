import { Outlet } from 'react-router-dom'
import React from "react"
import {useAuth} from "../Hooks/useAuth"

const CheckAdmin = () => {
    const {role} = useAuth()


    if(role !== 'admin') {
        return (
            <h1>Access denied</h1>
        )
    }

    return <Outlet />
}

export { CheckAdmin }