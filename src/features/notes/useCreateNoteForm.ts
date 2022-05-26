import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useCreatePostMutation } from "../api/notes";

const useCreateNoteform = () => {
  const [addPost, { isLoading, isError }] = useCreatePostMutation();
  const navigate = useNavigate();

  const { submit, title, content, reset, valid } = useForm({
    onSubmit: async ({ fields: { title } }) => {
      if (!title.valid) {
        return;
      } else {
        const data = await addPost({
          title: title.value,
          content: content.value,
        }).unwrap();
        navigate(`/view/${data.id}`);
      }
    },
    fields: [
      { id: "title", type: "text", required: true, placeholder: "title..." },
      { id: "content", type: "text", required: false },
    ],
  });
  return { submit, title, content, reset, valid, isLoading, isError };
};

export { useCreateNoteform };
