import React from 'react'
import 'Styles/Global/Header.scss'
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "Hooks/useAuth"
import { logOut } from "redux/Slices/authSlice"
import {useDispatch} from "react-redux"

const Header = () => {

    const {token} = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logOutHandler = () => {
        dispatch(logOut())
        navigate('/login', {replace: true})
    }

    return (
        <header>
            <div className="search">Search</div>
            <div className="account">
                    {token ? <span className="log_out" onClick={logOutHandler}>Log Out</span> : <>
                        <Link to="/login">Login</Link>
                        <Link to="/sign-up">Sign Up</Link>
                    </>}
            </div>
        </header>
    )
}

export default Header
