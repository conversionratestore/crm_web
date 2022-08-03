import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "./urls"

const GET_LIST_URL = '/clients'

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        keepUnusedDataFor: 5,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('crs-auth-token', token)
            }
            return headers
        }
    }),
    endpoints: build => ({
        getClients: build.query({
            query: () => ({
                url: GET_LIST_URL
            }),
        })
    })
})

export const { useGetClientsQuery } = dashboardApi
