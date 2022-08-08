import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "./urls"

const GET_LIST_URL = '/bugs'

export const bugTrackerApi = createApi({
    reducerPath: 'bugTrackerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token
            if (token) {
                headers.set('crs-auth-token', token)
            }
            return headers
        }
    }),
    endpoints: build => ({
        getBugs: build.query({
            query: (status = 'new') => ({
                url: `${GET_LIST_URL}?status=${status}`
            }),
        }),
        createBug: build.mutation({
            query: (body) => ({
                url: GET_LIST_URL,
                method: 'POST',
                body
            })
        })
    })
})

export const { useGetBugsQuery, useCreateBugMutation } = bugTrackerApi