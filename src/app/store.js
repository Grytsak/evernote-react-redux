import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../features/notes/notesSlice';
import notebooksReducer from '../features/notebooks/notebooksSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    notebooks: notebooksReducer
  },
});
