import { createContext, useState } from "react"
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(null)
    if(sessionStorage.getItem('access_token') && !auth) {
        const token = JSON.parse(sessionStorage.getItem('access_token'))
        setAuth(token)
    }

    const signIn = (data, cb) => {
        sessionStorage.setItem('access_token', JSON.stringify(data))
        setAuth(data)
        cb()
    }

    const signOut = () => {
        sessionStorage.removeItem('access_token')
        setAuth(null)
        navigate('/login', { replace: true })
    }

    return (
        <AuthContext.Provider value={{ auth, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
