import React from "react";
// import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Notes from "./routes/Notes";
import NoteDetail from "./routes/NoteDetail";
import CreateNoteForm from "./features/notes/CreateNoteForm";
import Nav from "./components/navigation/nav";
import { Box } from "@chakra-ui/react";
import Header from "./components/navigation/header";

import EditNoteForm from "./features/notes/EditNoteForm";
import CreateNote from "./routes/CreateNote";
function App() {
  return (
    <Box>
      <Header>
        <Nav />
      </Header>
      <Box as="main" p={2}>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/view/:id" element={<NoteDetail />} />
          <Route path="/edit/:id" element={<EditNoteForm />} />
          <Route path="/create" element={<CreateNote />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
