import { useSelector } from 'react-redux'

export function useAuth() {
    const {role, id, token} = useSelector(state => state.auth)

    return {
        role,
        id,
        token
    }
}