import {
  Button,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import { useCreateNoteform } from "./useCreateNoteForm";

const CreateNoteForm = () => {
  const { submit, title, content, isLoading, isError, valid } =
    useCreateNoteform();
  return (
    <>
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
        <Textarea {...content} mb={2} />
        <Button isLoading={isLoading} onClick={submit} disabled={!valid}>
          Add Post
        </Button>
      </form>
    </>
  );
};

export default CreateNoteForm;
