import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from "./urls"

const REGISTER_URL = '/auth/registration'
const LOGIN_URL = '/auth/login'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: build => ({
        getLogin: build.mutation({
            query: body => ({
                url: LOGIN_URL ,
                method: 'POST',
                body,
            }),
        }),
        register: build.mutation({
            query: body => ({
                url: REGISTER_URL,
                method: 'POST',
                body
            })
        })
    })
})

export const { useGetLoginMutation, useRegisterMutation } = authApi
