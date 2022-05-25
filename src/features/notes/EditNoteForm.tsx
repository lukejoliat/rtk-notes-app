import {
  Button,
  Input,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { useEditPostMutation, useGetPostQuery } from "../api/notes";

const EditNoteForm = () => {
  const { id } = useParams();
  const [editNote, { isLoading, isError }] = useEditPostMutation();
  const {
    data: note,
    isLoading: noteLoading,
    isError: noteError,
  } = useGetPostQuery(id || "");
  const title = useInput(note?.title);
  const content = useInput(note?.content);
  const invalid = title.value === "";
  const handleSubmit = () => {
    if (!invalid) {
      editNote({
        id: `${note?.id}`,
        title: `${title.value}`,
        content: `${content.value}`,
      }).unwrap();
      navigate(`/view/${note?.id}`);
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <Heading>Edit Note</Heading>
      <form>
        {isError ? (
          <Alert status="error" mb={2}>
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an error creating your note.
            </AlertDescription>
          </Alert>
        ) : null}
        {noteLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <FormControl isInvalid={invalid}>
              <Input
                required
                placeholder="title"
                type="text"
                {...title}
                mb={2}
              />
            </FormControl>
            <Input placeholder="content" type="text" {...content} mb={2} />
            <Button isLoading={isLoading} type="button" onClick={handleSubmit}>
              Save
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export default EditNoteForm;
