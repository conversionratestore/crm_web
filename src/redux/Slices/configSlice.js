import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: null,
    message: null,
    overlayPos: ''
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setParams: (state, action) => {
            state.status = action.payload.status
            state.message = action.payload.message
        },
        setOverlay: (state, action) => {
            state.overlayPos = action.payload
        }
    }
})

export const { setParams, setOverlay } = configSlice.actions

export default configSlice.reducer