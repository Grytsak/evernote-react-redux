import { createSlice } from "@reduxjs/toolkit";
import { NotebookList } from "./NotebooksList";

const initialState = {
    notebooksArray: [
        {
            id: 'common-notebook',
            name: 'Common',
            notes: [],
            date: new Date().toISOString()
        }
    ]
}

const notebooksSlice = createSlice({
    name: 'notebooks',
    initialState,
    reducers: {
        addNewNotebook(state, action) {
            state.notebooksArray.push(action.payload);
        },
        
        addNoteToNotebook(state, action) {
            const { note, url } = action.payload;
            let urlParts = url.split('/');
            let notebookId = urlParts.pop();

            if(url.includes('notebook/')) {
                state.notebooksArray.find(notebook => {
                    if(notebook.id === notebookId) {
                        notebook.notes.push(note);
                    }
                })
            } else {
                state.notebooksArray.find(notebook => {
                    if(notebook.id === 'common-notebook') {
                        notebook.notes.push(note);
                    }
                })
            }
        },

        editNoteInNotebook(state, action) {
            const { id, title, content, notebookId } = action.payload;
            const existingNotebook = state.notebooksArray.find(notebook => notebook.id === notebookId);
            const exsistingNote = existingNotebook.notes.find(note => note.id === id);

            if(exsistingNote) {
                exsistingNote.title = title;
                exsistingNote.content = content;
            }
        },

        deleteNoteInNotebook(state, action) {
            const {id, notebookId}  = action.payload;
            const existingNotebook = state.notebooksArray.find(notebook => notebook.id ===  notebookId);
            existingNotebook.notes.find((note, index) => {
                if(note.id === id) {
                    existingNotebook.notes.splice(index, 1);
                    return note;
                }
            });
        },

        selectNotebook(state, action) {
            state.selectedNotebook = action.payload;
        },

        changeNoteNotebook(state, action) {
            const { selectedNote, notebookId } = action.payload;
            const notebooks = state.notebooksArray;
            const newNotebook = notebooks.find(notebookIt => notebookIt.id === notebookId);

            notebooks.map(notebookItem => {
                notebookItem.notes.find((note, index) => {
                    if(note.id === selectedNote.id) {
                        notebookItem.notes.splice(index, 1);
                        newNotebook.notes.push({
                            ...selectedNote,
                            notebook: notebookId
                        });
                        return 1;
                        
                    }
                })
            })
        },

    }
})

export const {
    addNewNotebook,
    addNoteToNotebook,
    editNoteInNotebook,
    deleteNoteInNotebook,
    selectNotebook,
    changeNoteNotebook,
} = notebooksSlice.actions;

export const selectNotebooks = (state) => {
    return state.notebooks.notebooksArray;
}

export default notebooksSlice.reducer;