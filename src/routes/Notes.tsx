import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Grid,
  GridItem,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/card/Card";
import { CardActions } from "../components/card/CardActions";
import { CardContent } from "../components/card/CardContent";
import { CardHeader } from "../components/card/CardHeader";
import { useDeletePostMutation, useGetPostsQuery } from "../features/api/notes";
import useInput from "../hooks/useInput";

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
  const search = useInput("");

  const filteredNotes = useMemo(() => {
    if (search.value && notes && notes.length && notes.length > 0) {
      return notes.filter((n) => n.title.includes(`${search.value}`));
    }
    return notes;
  }, [search.value, notes]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>There was an error retrieving your notes.</div>;
  else
    return (
      <>
        <Heading>My Notes</Heading>
        <Input type="text" {...search} placeholder="Search Notes..." my={2} />
        <Grid templateColumns="repeat(auto-fill,minmax(250px,1fr))" gap={6}>
          {filteredNotes?.map((n: Note) => (
            <GridItem key={n.id}>
              <Card borderRadius={6} bg="gray.500">
                <CardHeader heading={n.title} subheading={"Lukes Note"} />
                <CardContent h={100} overflow="hidden">
                  {n.content}
                </CardContent>
                <CardActions>
                  <Button variant={"outline"} as={Link} to={`/view/${n?.id}`}>
                    View
                  </Button>
                  <Button variant={"outline"} as={Link} to={`/edit/${n?.id}`}>
                    Edit
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => deleteNote(n?.id || "")}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </>
    );
};

export default Notes;
