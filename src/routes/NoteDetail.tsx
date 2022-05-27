import { Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetNoteQuery } from "../features/api/notes";
const NoteDetail = () => {
  const { id } = useParams();
  const { data: note, isError, error, isLoading } = useGetNoteQuery(id || "");
  const naviate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  else
    return (
      <>
        <Heading>{note?.title}</Heading>
        <Text as="p">{note?.content}</Text>
        <Button onClick={() => naviate(`/edit/${note?.id}`)}>Edit</Button>
      </>
    );
};

export default NoteDetail;
