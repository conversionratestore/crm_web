import TextField from "@mui/material/TextField"
import React from "react"
import Button from "@mui/material/Button"
import { useEffect, useState } from 'react'
import 'Styles/Pages/Login.scss'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useGetLoginMutation } from '../redux/Api/authApi'
import { useDispatch } from "react-redux"
import { setCredentials } from "../redux/Slices/authSlice"
import { useAuth } from "../Hooks/useAuth"
import {setParams} from "../redux/Slices/configSlice"


const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w]{2,6}$/

const Login = () => {
    const dispatch = useDispatch()
    const {token} = useAuth()
    const [pwd, setPwd] = useState('')
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [access, setAccess] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const prev = location.state?.from?.pathname || '/dashboard'
    const [login] = useGetLoginMutation()

    useEffect(() => {
        const test = EMAIL_REGEX.test(email)
        setValidEmail(test)
    }, [email])

    useEffect(() => {
        if(pwd.length > 0 && validEmail) {
            setAccess(false)
        } else {
            setAccess(true)
        }
    }, [pwd, validEmail])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await login({email, pwd}).unwrap()
            dispatch(setCredentials(result))
            dispatch(setParams(result))
            navigate(prev, {replace: true})
        } catch (e) {
            console.log(e)
        }
    }


    return ( token ? <Navigate to="/dashboard" replace={true} /> :
        <section className="login content">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <TextField onChange={(e) => {setEmail(e.target.value)}} type="email" id="email" label="Email" variant="filled" required value={email}/>
                <TextField onChange={(e) => {setPwd(e.target.value)}} type="password" id="pwd" label="Password" variant="filled" required value={pwd}/>
                <Button
                    type="submit"
                    disabled={access}
                    variant="contained">Login</Button>
            </form>
        </section>
    )
}

export default Login
