import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, Link } from "react-router-dom";

import { Sidebar } from './app/Sidebar';
import { NotesList } from './features/notes/NotesList';
import { NoteEditor } from './features/notes/NoteEditor';
import { NotebookList } from './features/notebooks/NotebooksList';
import { NotebookNotesList } from './features/notebooks/NotebookNotesList';

library.add(fas);

function App() {
  return (
      <div className="App">
        <Sidebar />
        <Routes>
          <Route 
            path="notes" 
            element={<><NotesList /><NoteEditor /></>}>
          </Route>
          <Route 
            path='notebooks' 
            element={<NotebookList />}>
          </Route>
          <Route
            path='notebook/:notebookId'
            element={<><NotebookNotesList /><NoteEditor /></>}>
          </Route>
          <Route
            path='note/:noteId'
            element={<NoteEditor />}>
          </Route>
        </Routes>
      </div>
  );
}

export default App;
