// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useEffect, useState } from "react";
import { NotEmittedStatement } from "typescript";
import { Note } from "../../routes/Notes";

interface User {
  id: number;
  username: string;
}

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  // The "endpoints" represent operations and requests for this server
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query<Note[], void>({
      // The URL for the request is '/fakeApi/posts'
      query: () => "/notes",
      providesTags: (result = [], error, arg) =>
        result
          ? ["Note", ...result.map(({ id }) => ({ type: "Note" as const, id }))]
          : ["Note"],
    }),
    getPostsAndUsers: builder.query<{ notes: Note[]; users: User[] }, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const users = await fetchWithBQ("/users");
        const posts = await fetchWithBQ("/notes");
        return {
          data: {
            users: users.data as User[],
            notes: posts.data as Note[],
          },
        };
      },
      providesTags: ["Note", "User"],
    }),
    getPost: builder.query<Note, string>({
      // The URL for the request is '/fakeApi/posts'
      query: (id) => `/notes/${id}`,
      providesTags: (result, error, arg) => [{ type: "Note", id: arg }],
    }),
    createPost: builder.mutation<Note, Note>({
      // The URL for the request is '/fakeApi/posts'
      query: (note) => ({
        url: `/notes`,
        method: "POST",
        // Include the entire post object as the body of the request
        body: note,
      }),
      invalidatesTags: ["Note"],
    }),
    editPost: builder.mutation<Note, Note>({
      // The URL for the request is '/fakeApi/posts'
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: "PUT",
        // Include the entire post object as the body of the request
        body: note,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deletePost: builder.mutation<Note, string>({
      // The URL for the request is '/fakeApi/posts'
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetPostsAndUsersQuery,
} = apiSlice;
// export const { useGetPostsQuery } = {
//   useGetPostsQuery: () => {
//     const [posts, setPosts] = useState<Note[]>([]);
//     const [error, setError] = useState<String | null>(null);
//     const [loading, setLoading] = useState<Boolean>(false);
//     const [success, setSuccess] = useState<Boolean>(false);
//     useEffect(() => {
//       setLoading(true);
//       fetch("http://localhost:3000/notes")
//         .then((res) => res.json())
//         .then((posts) => {
//           setPosts(posts);
//           setSuccess(true);
//         })
//         .then(() => setSuccess(true))
//         .catch((e) => {
//           setError(e);
//           setSuccess(false);
//         })
//         .finally(() => setLoading(false));
//     }, []);
//     return {
//       data: posts,
//       error,
//       isError: Boolean(error),
//       isLoading: loading,
//       isSuccess: success,
//     };
//   },
// };
