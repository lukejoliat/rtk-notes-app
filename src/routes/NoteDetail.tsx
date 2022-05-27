import { EditIcon } from "@chakra-ui/icons";
import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetPostQuery } from "../features/api/notes";
const NoteDetail = () => {
  const { id } = useParams();
  const { data: note, isError, error, isLoading } = useGetPostQuery(id || "");
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
