import { GENRE_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createGenre:builder.mutation({
            query:(data)=>({
                url:`${GENRE_URL}/`,
                method:'POST',
                body:data
            })
        }),

        updateGenre:builder.mutation({
            query:({id , data}) => ({
                url:`${GENRE_URL}/${id}`,
                method:'PUT',
                body:data
            })
        }),
        
        deleteGenre:builder.mutation({
            query:({id ,data}) => ({
                url:`${GENRE_URL}/${id}`,
                method:'DELETE',
                body:data
            })
        }),
        getAllGenres:builder.query({
            query:()=>`${GENRE_URL}/genres`
        }),

        getGenreById:builder.mutation({
            query:(id) => ({
                url:`${GENRE_URL}/${id}`,
                method:'GET',
                
            })
            })
        })
    })
export const {useCreateGenreMutation , useUpdateGenreMutation, useDeleteGenreMutation, useGetAllGenresQuery, useGetGenreByIdMutation} = genreApiSlice