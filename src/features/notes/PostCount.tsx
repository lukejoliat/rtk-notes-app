import { Heading, Text } from "@chakra-ui/react";
import { createSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useGetPostsAndUsersQuery, useGetPostsQuery } from "../api/notes";

export interface Note {
  id?: string;
  title: string;
  content?: string;
}

const PostCount = () => {
  //   const lukesNotes = useSelector((state: any) => {
  //     return state?.api?.posts.filter((n: Note) => n.title.includes("luke's"));
  //   });

  const { data } = useGetPostsAndUsersQuery();

  console.log("rendered post count");

  return (
    <Heading>
      Post Count <Text as="strong">{JSON.stringify(data)}</Text>
    </Heading>
  );
};

export default PostCount;
