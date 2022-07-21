import { useEffect, useRef, useState } from 'react'
import './PageStyle/Register.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from "@mui/material/Alert";
import axios from "Apis/axios";
import { Link } from 'react-router-dom';


const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/
const REGISTER_URL = '/auth/registration'

const Register = () => {
    const emailRef = useRef()
    const warningRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const [pwd, setPwd] = useState('')

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)

    const [warningMsg, setWarningMsg] = useState('')
    const [errMsg, setErrMsg] = useState({ss: "", msg: ""})

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
            const res = await axios.post(REGISTER_URL,{email, pwd})
            const ss = res.data.ss
            const msg = res.data.msg
            setErrMsg({ss, msg})
            setEmail('')
            setPwd('')
            setMatchPwd('')
        } catch (e) {
            const ss = e.response.data.ss
            const msg = e.response.data.msg
            setErrMsg({ss, msg})
        }
    }


    return (
        <section id="registration">
            <Alert ref={warningRef} className={warningMsg ? "warning" : "warning dn"} severity="warning">{warningMsg}</Alert>
            <Alert ref={errRef} className={errMsg.ss ? "" : "dn"} severity={errMsg.ss ? errMsg.ss : "info"}>{errMsg.msg}</Alert>
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
    );
};

export default Register;
