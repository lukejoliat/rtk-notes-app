import React from "react";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import Notes from "./routes/Notes";
import NoteDetail from "./routes/NoteDetail";
import Nav from "./components/navigation/Nav";
import { Box, Container } from "@chakra-ui/react";
import Header from "./components/navigation/Header";

import EditNote from "./routes/EditNote";
import CreateNote from "./routes/CreateNote";
function App() {
  return (
    <Box>
      <Header>
        <Nav />
      </Header>
      <Container maxW="container.lg" as="main" p={2}>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/view/:id" element={<NoteDetail />} />
          <Route path="/edit/:id" element={<EditNote />} />
          <Route path="/create" element={<CreateNote />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
