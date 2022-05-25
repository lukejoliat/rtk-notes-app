import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useEditPostMutation, useGetPostQuery } from "../api/notes";

const useEditNoteForm = (id: string) => {
  const {
    data: note,
    isLoading: noteLoading,
    isError: noteError,
    isSuccess,
  } = useGetPostQuery(id);
  const [editPost, { isLoading, isError }] = useEditPostMutation();
  const navigate = useNavigate();
  const { submit, title, content, reset, valid } = useForm(
    {
      onSubmit: (data) => {
        if (!title.valid) {
          return;
        } else {
          editPost({ id, title: title.value, content: content.value }).unwrap();
          navigate(`/view/${note?.id}`);
        }
      },
      fields: [
        {
          id: "title",
          type: "text",
          required: true,
          placeholder: "title...",
          value: note?.title,
        },
        { id: "content", type: "text", required: false, value: note?.content },
      ],
    },
    isSuccess
  );
  return {
    submit,
    title,
    content,
    reset,
    valid,
    isLoading,
    noteLoading,
    noteError,
    isError,
  };
};

export { useEditNoteForm };
