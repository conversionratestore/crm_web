import { useEffect, useRef, useState } from 'react'
import '../Styles/Pages/Register.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from "@mui/material/Alert"
import {Link, useNavigate} from 'react-router-dom'
import { useRegisterMutation } from "../redux/Api/authApi"
import {useDispatch} from "react-redux"
import {setParams} from "../redux/Slices/configSlice"


const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w]{2,6}$/

const Register = () => {
    const emailRef = useRef()
    const warningRef = useRef()
    const dispatch = useDispatch()
    const [register] = useRegisterMutation()
    const navigate = useNavigate()


    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const [pwd, setPwd] = useState('')

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)

    const [warningMsg, setWarningMsg] = useState('')

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const match = pwd === matchPwd && pwd.length !== 0
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        if(!validMatch && matchPwd.length > 0) {
            setWarningMsg('Passwords do not match')
        } else if(!validEmail && email.length > 0) {
            setWarningMsg('Invalid email address')
        } else {
            setWarningMsg('')
        }
    }, [email, pwd, matchPwd, validEmail, validMatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await register({email, pwd}).unwrap()
            dispatch(setParams(response))
            navigate('/login', {replace: true})
        } catch (e) {
            dispatch(setParams(e.data))
        }
    }


    return (
        <section id="registration">
            <Alert ref={warningRef} className={warningMsg ? "warning" : "warning dn"} severity="warning">{warningMsg}</Alert>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>

                <TextField
                    type="email"
                    ref={emailRef}
                    id="email"
                    label="Email"
                    variant="filled"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}/>
                <TextField onChange={(e) => setPwd(e.target.value)} type="password" id="pwd" label="Password" variant="filled" required value={pwd} />
                <TextField onChange={(e) => setMatchPwd(e.target.value)} type="password" id="matchPwd" label="Confirm password" variant="filled" required value={matchPwd} />
                <Button
                    type="submit"
                    disabled={!validEmail || !validMatch}
                    variant="contained">Sign Up</Button>
            </form>
            <p>Already registered?<br />
                <Link to="/login">Sign In</Link>
            </p>
        </section>
    )
}

export default Register
