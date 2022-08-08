import { useSelector } from 'react-redux'

export function useAuth() {
    const {role, name, token} = useSelector(state => state.auth)

    return {
        role,
        name,
        token
    }
}