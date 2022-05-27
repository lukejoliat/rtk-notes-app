import {
  Button,
  Input,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormControl,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEditNoteForm } from "../features/notes/useEditNoteForm";

const EditNote = () => {
  const { id } = useParams();
  const { submit, title, content, isLoading, isError, valid } = useEditNoteForm(
    id || ""
  );
  return (
    <>
      <Heading>Edit Note</Heading>
      <Box as="form" onSubmit={submit}>
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
          Save
        </Button>
      </Box>
    </>
  );
};

export default EditNote;
