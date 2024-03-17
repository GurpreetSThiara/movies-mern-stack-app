import { USERS_URL,BASE_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import Register from './../../pages/Auth/Register';


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        login:builder.mutation({
            query:(data)=>({
                url:`${BASE_URL}/auth`,
                method:'POST',
                body:data
            })
        }),
        register: builder.mutation({
            query:(data) => ({
                url:`/`,
                method:"POST",
                body:data,
            })
        })
    })
})


export const {useLoginMutation, useRegisterMutation} = userApiSlice;