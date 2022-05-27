import { useNavigate } from "react-router-dom";
import useForm, {
  FormResponse,
  InternalFieldText,
  InternalFieldTextArea,
} from "../../hooks/useForm";
import { useCreateNoteMutation } from "../api/notes";

interface CreateNoteFormResponse extends FormResponse {
  isError: boolean;
  isLoading: boolean;
  title: InternalFieldText;
  content: InternalFieldTextArea;
}

const useCreateNoteform = (): CreateNoteFormResponse => {
  const [addPost, { isLoading, isError }] = useCreateNoteMutation();
  const navigate = useNavigate();

  const { submit, title, content, reset, valid } = useForm({
    onSubmit: async ({ fields: { title, content } }) => {
      if (!title.valid) {
        return;
      } else {
        const data = await addPost({
          title: `${title.value}`,
          content: `${content.value}`,
        }).unwrap();
        navigate(`/view/${data.id}`);
      }
    },
    fields: [
      { id: "title", type: "text", required: true, placeholder: "title..." },
      { id: "content", type: "text", required: false },
    ],
  });
  return {
    submit,
    title,
    content,
    reset,
    valid,
    isLoading,
    isError,
  } as CreateNoteFormResponse;
};

export { useCreateNoteform };
