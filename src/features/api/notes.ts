// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
    // The `getNotes` endpoint is a "query" operation that returns data
    getNotes: builder.query<Note[], void>({
      query: () => "/notes",
      providesTags: (result = [], error, arg) =>
        result
          ? ["Note", ...result.map(({ id }) => ({ type: "Note" as const, id }))]
          : ["Note"],
    }),
    getNotesAndUsers: builder.query<{ notes: Note[]; users: User[] }, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const users = await fetchWithBQ("/users");
        const notes = await fetchWithBQ("/notes");
        return {
          data: {
            users: users.data as User[],
            notes: notes.data as Note[],
          },
        };
      },
      providesTags: ["Note", "User"],
    }),
    getNote: builder.query<Note, string>({
      // The URL for the request is '/fakeApi/notes'
      query: (id) => `/notes/${id}`,
      providesTags: (result, error, arg) => [{ type: "Note", id: arg }],
    }),
    createNote: builder.mutation<Note, Note>({
      // The URL for the request is '/fakeApi/notes'
      query: (note) => ({
        url: `/notes`,
        method: "POST",
        // Include the entire note object as the body of the request
        body: note,
      }),
      invalidatesTags: ["Note"],
    }),
    editNote: builder.mutation<Note, Note>({
      // The URL for the request is '/fakeApi/notes'
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: "PUT",
        // Include the entire note object as the body of the request
        body: note,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation<Note, string>({
      // The URL for the request is '/fakeApi/notes'
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

// Export the auto-generated hook for the `getNotes` query endpoint
export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
  useGetNotesAndUsersQuery,
} = apiSlice;
// export const { useGetNotesQuery } = {
//   useGetNotesQuery: () => {
//     const [notes, setNotes] = useState<Note[]>([]);
//     const [error, setError] = useState<String | null>(null);
//     const [loading, setLoading] = useState<Boolean>(false);
//     const [success, setSuccess] = useState<Boolean>(false);
//     useEffect(() => {
//       setLoading(true);
//       fetch("http://localhost:3000/notes")
//         .then((res) => res.json())
//         .then((notes) => {
//           setNotes(notes);
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
//       data: notes,
//       error,
//       isError: Boolean(error),
//       isLoading: loading,
//       isSuccess: success,
//     };
//   },
// };
