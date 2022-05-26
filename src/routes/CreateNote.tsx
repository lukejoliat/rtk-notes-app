import { Heading, VStack } from "@chakra-ui/react";
import CreateNoteForm from "../features/notes/CreateNoteForm";

const CreateNote = () => {
  return (
    <VStack>
      <Heading>Create Note</Heading>
      <CreateNoteForm />
    </VStack>
  );
};

export default CreateNote;
