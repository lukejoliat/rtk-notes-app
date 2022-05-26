import { EditIcon } from "@chakra-ui/icons";
import { Button, HStack, Text } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useGetPostQuery } from "../features/api/notes";
const NoteDetail = () => {
  const { id } = useParams();
  const { data: note, isError, error, isLoading } = useGetPostQuery(id || "");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  else
    return (
      <>
        <HStack>
          <Text>
            <strong>Title: </strong>
            {note?.title}
          </Text>
          <Button as={Link} to={`/edit/${note?.id}`}>
            <EditIcon />{" "}
          </Button>
        </HStack>
        <Text>
          <strong>Content: </strong>
          {note?.content}
        </Text>
      </>
    );
};

export default NoteDetail;
