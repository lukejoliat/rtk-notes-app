import useForm from "../../hooks/useForm";
import { useCreatePostMutation } from "../api/notes";

const useCreateNoteform = () => {
  const [addPost, { isLoading, isError }] = useCreatePostMutation();

  const { submit, title, content, reset, valid } = useForm({
    onSubmit: (data) => {
      if (!title.valid) {
        return;
      } else {
        addPost({ title: title.value, content: content.value }).unwrap();
        reset();
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
