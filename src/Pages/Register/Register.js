import React, { useEffect, useRef, useState} from 'react'
import './Register.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/

const Register = () => {
    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const [pwd, setPwd] = useState('')

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        console.log(emailRef.current)
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const match = pwd === matchPwd && pwd.length !== 0
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
    }, [email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!EMAIL_REGEX.test(email)) {
            setErrMsg('Invalid email')
            return;
        }
    }


    return (
        <section id="registration">
            <p ref={errRef} className={errMsg ? "errmsg" : "dn"}>{errMsg}</p>
            <h1>Registration</h1>
            <form onSubmit={handleSubmit}>
            <TextField
                type="email"
                ref={emailRef}
                id="email"
                label="Email"
                variant="filled"
                onChange={(e) => setEmail(e.target.value)}
                required />
            <TextField onChange={(e) => setPwd(e.target.value)} type="password" id="pwd" label="Password" variant="filled" required />
            <TextField onChange={(e) => setMatchPwd(e.target.value)} type="password" id="matchPwd" label="Confirm password" variant="filled" required />
            <Button
                type="submit"
                disabled={!validEmail || !validMatch}
                variant="contained">Sign Up</Button>
            </form>
            <p>Already registered?<br />
                <a href="#">Sign In</a>
            </p>
        </section>
    );
};

export default Register;
