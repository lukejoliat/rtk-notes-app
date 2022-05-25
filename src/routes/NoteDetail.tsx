import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../features/api/notes";
import PostCount from "../features/notes/PostCount";

const NoteDetail = () => {
  const { id } = useParams();
  const { data: note, isError, error, isLoading } = useGetPostQuery(id || "");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  else
    return (
      <>
        <Text>
          <strong>Title: </strong>
          {note?.title}
        </Text>
        <p>
          <strong>Content: </strong>
          {note?.content}
        </p>
      </>
    );
};

export default NoteDetail;
