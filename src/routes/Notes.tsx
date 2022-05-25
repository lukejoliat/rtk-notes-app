import { DeleteIcon } from "@chakra-ui/icons";
import { Heading, List, ListIcon, ListItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDeletePostMutation, useGetPostsQuery } from "../features/api/notes";

export interface Note {
  id?: string;
  title: string;
  content?: string;
}

const Notes = () => {
  const { data: notes, isLoading, isError, error } = useGetPostsQuery();
  useEffect(() => {
    if (isError) console.error(error);
  }, [error, isError]);
  const [deleteNote] = useDeletePostMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>There was an error retrieving your notes.</div>;
  else
    return (
      <>
        <Heading>My Notes</Heading>
        <List>
          {notes?.map((n: Note) => (
            <ListItem key={n.id}>
              <Link to={`/view/${n.id}`}>{n.title}</Link>
              <ListIcon>
                <DeleteIcon onClick={() => deleteNote(n.id || "")} />
              </ListIcon>
            </ListItem>
          ))}
        </List>
      </>
    );
};

export default Notes;
