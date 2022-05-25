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
import { useCreateNoteform } from "./useCreateNoteForm";

const CreateNoteForm = () => {
  const { submit, title, content, isLoading, isError, valid } =
    useCreateNoteform();
  console.log("form rendered!");
  return (
    <>
      <Heading>Create a Note</Heading>
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
          Add Post
        </Button>
      </form>
    </>
  );
};

export default CreateNoteForm;
