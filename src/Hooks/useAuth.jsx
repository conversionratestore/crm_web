import { useContext } from 'react'
import { AuthContext } from 'Hoc/AuthProvider'

export function useAuth() {
    return useContext(AuthContext)
}