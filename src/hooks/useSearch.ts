import { useMemo } from "react";
import { Note } from "../routes/Notes";
import useInput, { UseInputReturn } from "./useInput";

const useSearch = (
  notes: Note[] | undefined
): {
  filteredNotes: Note[];
  search: UseInputReturn;
} => {
  const search = useInput("");

  const filteredNotes = useMemo(() => {
    if (!notes || !notes.length || notes.length <= 0) return [];
    if (search.value) {
      return notes.filter((n) => n.title.includes(`${search.value}`));
    }
    return notes;
  }, [search.value, notes]);

  return { filteredNotes, search };
};

export { useSearch };
