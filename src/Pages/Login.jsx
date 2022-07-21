import TextField from "@mui/material/TextField"
import React from "react"
import Button from "@mui/material/Button"
import { useEffect, useState } from 'react'
import 'Pages/PageStyle/Login.scss'
import axios from "Apis/axios"
import {useAuth} from "../Hooks/useAuth"
import { Navigate, useLocation, useNavigate } from 'react-router-dom'


const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/

const Login = () => {
    const [pwd, setPwd] = useState('')
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [access, setAccess] = useState(true)
    const {signIn, auth} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const prev = location.state?.from?.pathname || '/dashboard'
    console.log(location)

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
            const res = await axios.post('/auth/login', {email, pwd})
            signIn(res.data.token, () => navigate(prev, {replace: true}))
        } catch (e) {
            console.log(e)
        }
    }


    return ( auth ? <Navigate to="/dashboard" replace={true} /> :
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
    );
};

export default Login;
