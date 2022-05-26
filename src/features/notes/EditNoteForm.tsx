import {
  Button,
  Input,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
  useForceUpdate,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEditNoteForm } from "./useEditNoteForm";

const EditNoteForm = () => {
  const { id } = useParams();
  const { submit, title, content, isLoading, isError, valid } = useEditNoteForm(
    id || ""
  );
  console.log("form rendered!");
  return (
    <>
      <Heading>Edit Note</Heading>
      <form onSubmit={submit}>
        {isError ? (
          <Alert status="error" mb={2}>
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an error creating your note.
            </AlertDescription>
          </Alert>
        ) : null}
        <FormControl isInvalid={title ? !title.valid : false}>
          <Input {...title} mb={2} />
        </FormControl>
        <Input {...content} mb={2} />
        <Button isLoading={isLoading} onClick={submit} disabled={!valid}>
          Save
        </Button>
      </form>
    </>
  );
};

export default EditNoteForm;
