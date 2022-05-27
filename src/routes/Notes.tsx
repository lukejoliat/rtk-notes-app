import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/card/Card";
import { CardActions } from "../components/card/CardActions";
import { CardContent } from "../components/card/CardContent";
import { CardHeader } from "../components/card/CardHeader";
import Search from "../components/search/Search";
import { useDeleteNoteMutation, useGetNotesQuery } from "../features/api/notes";
import { useSearch } from "../hooks/useSearch";
import { formatDate } from "../utils/utils";

export interface Note {
  id?: string;
  title: string;
  content?: string;
  createdAt?: string;
}

const Notes = () => {
  const { data: notes, isLoading, isError, error } = useGetNotesQuery();
  useEffect(() => {
    if (isError) console.error(error);
  }, [error, isError]);
  const [deleteNote] = useDeleteNoteMutation();
  const { filteredNotes, search } = useSearch(notes);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>There was an error retrieving your notes.</div>;
  else
    return (
      <>
        <Search search={search} />
        <Grid templateColumns="repeat(auto-fill,minmax(250px,1fr))" gap={6}>
          {filteredNotes?.map((n: Note) => (
            <GridItem key={n.id}>
              <Card borderRadius={6} bg="yellow.100">
                <CardHeader
                  heading={n.title}
                  subheading={`${formatDate(n?.createdAt)}`}
                />
                <CardContent h={115} overflow="hidden">
                  {n.content}
                </CardContent>
                <CardActions>
                  <Button variant={"ghost"} as={Link} to={`/view/${n?.id}`}>
                    <ViewIcon />
                  </Button>
                  <Button variant={"ghost"} as={Link} to={`/edit/${n?.id}`}>
                    <EditIcon />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() => deleteNote(n?.id || "")}
                  >
                    <DeleteIcon />
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
