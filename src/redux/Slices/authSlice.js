import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    role: null,
    name:  null,
    token: null,
    id: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { name, token, role, id } = action.payload
            state.name = name
            state.token = token
            state.role = role
            state.id = id
        },
        logOut: (state, action) => {
            state.name = null
            state.token = null
            state.role = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer
