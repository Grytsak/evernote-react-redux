import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notesArray: [],
    selectedNote: {
        id: '',
        title: '',
        content: '',
        notebook: '',
        date: ''
    }
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNewNote(state, action) {
            state.notesArray.push(action.payload);
        },
        selectNote(state, action) {
            state.selectedNote = action.payload;
        },
        deleteNote(state, action) {
            const id  = action.payload;
            state.notesArray.find((note, index) => {
                if(note.id === id) {
                    state.notesArray.splice(index, 1);
                    state.selectedNote.title = '';
                    state.selectedNote.content = '';
                    return note;
                }
            });
        },
        editNote(state, action) {
            const { id, title, content } = action.payload;
            const exsistingNote = state.notesArray.find(note => note.id === id);
            const selectedNote = state.selectedNote;

            if(exsistingNote && selectedNote) {
                exsistingNote.title = title;
                selectedNote.title = title;
                exsistingNote.content = content;
                selectedNote.content = content;
            }
        },
        changeNotebook(state, action) {
            const { selectedNote, notebookId } = action.payload;
            let notes = state.notesArray;

            notes.find(note => {
                if(note.id === selectedNote.id) {
                    note.notebook = notebookId;
                    state.selectedNote.notebook = notebookId;
                }
            })
        }
    }
});

export const {
    addNewNote,
    selectNote,
    editNote,
    deleteNote,
    changeNotebook 
} = notesSlice.actions;

export const selectNotes = (state) => {
    return state.notes.notesArray;
}

export const selectSelectedNote = (state) => {
    return state.notes.selectedNote;
}

export default notesSlice.reducer;