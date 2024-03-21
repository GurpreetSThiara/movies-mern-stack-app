import { apiSlice } from "./apiSlice";
import { BASE_URL, MOVIE_URL } from "../constants";
import { updateMovie } from "../../../../backend/controllers/movieController";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `${MOVIE_URL}/`,
    }),

    createMovie: builder.mutation({
      query: (movie) => ({
        url: `${MOVIE_URL}/movie/create`,
        method: "POST",
        body: movie,
      }),
    }),
    updateMovie: builder.mutation({
      query: ({ id, movie }) => ({
        url: `${MOVIE_URL}/movie/update/${id}`,
        method: "PUT",
        body: updateMovie,
      }),
    }),

    deleteMovie: builder.mutation({
      query: ({ id }) => ({
        url: `${MOVIE_URL}/movie/delete/${id}`,
        method: "DELETE",
      }),
    }),

    getSingleMovie: builder.query({
      query: (id) => `${MOVIE_URL}/movie/${id}`,
    }),
    getNewMovies: builder.query({
      query: () => `${MOVIE_URL}/movies/new`,
    }),

    getTopMovies: builder.query({
      query: () => `${MOVIE_URL}/movies/top`,
    }),

    getRandomMovies: builder.query({
      query: () => `${MOVIE_URL}/movies/random`,
    }),

    addMovieReview: builder.mutation({
        query: ({ id, rating, comment }) => ({
          url: `${MOVIE_URL}/${id}/reviews`,
          method: "POST",
          body: { rating, id, comment },
        }),
      }),
  
      deleteComment: builder.mutation({
        query: ({ movieId, reviewId }) => ({
          url: `${MOVIE_URL}/comment/delete`,
          method: "DELETE",
          body: { movieId, reviewId },
        }),
      }),
  }),
});


export const {
    useGetAllMoviesQuery,
    useCreateMovieMutation,
    useUpdateMovieMutation,
    useDeleteMovieMutation,
    useGetSingleMovieQuery,
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
    useAddMovieReviewMutation,
    useDeleteCommentMutation,
  } = moviesApiSlice;