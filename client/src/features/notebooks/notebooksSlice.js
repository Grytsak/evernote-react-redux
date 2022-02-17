import { createSlice, current } from "@reduxjs/toolkit";
import { NotebookList } from "./NotebooksList";

const initialState = {
    notebooksArray: [
        {
            id: 'common-notebook',
            name: 'Common',
            notes: [],
            date: new Date().toISOString()
        },
        {
            id: 'trash-notebook',
            name: 'Trash',
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

        moveNoteToTrashInNotebook(state, action) {
            const {selectedNote, notebookId}  = action.payload;
            const existingNotebook = state.notebooksArray.find(notebook => notebook.id ===  notebookId);
            const notebookTrash = state.notebooksArray.find(notebook => notebook.id === 'trash-notebook')
            existingNotebook.notes.find((note, index) => {
                if(note.id === selectedNote.id) {
                    existingNotebook.notes.splice(index, 1);
                    notebookTrash.notes.push({
                        ...selectedNote,
                        notebook: 'trash-notebook',
                        inTrash: true,
                        beforeTrashNotebook: notebookId
                    });
                    return note;
                }
            });
        },

        restoreNoteInNotebook(state, action) {
            const selectedNote = action.payload;
            const notebookId = selectedNote.beforeTrashNotebook;
            state.notebooksArray.find(notebook => {
                if(notebook.id === notebookId) {
                    notebook.notes.push({
                        ...selectedNote,
                        notebook: notebookId,
                        inTrash: false,
                        beforeTrashNotebook: ''
                    })
                }
            })
            const trashNotes = state.notebooksArray.find(notebook => notebook.id === 'trash-notebook').notes;
            trashNotes.find((note, index) => {     
                if(note.id === selectedNote.id) {
                    trashNotes.splice(index, 1);
                    return note;
                }
            })
        },

        deleteNoteInNotebook(state, action) {
            const id = action.payload;
            const trashNotes = state.notebooksArray.find(notebook => notebook.id === 'trash-notebook').notes;

            trashNotes.find((note, index) => {     
                if(note.id === id) {
                    trashNotes.splice(index, 1);
                    return note;
                }
            })
        },

        renameNotebook(state, action) {
            const {id, newName} = action.payload;

            state.notebooksArray.find(notebook => {
                if(notebook.id === id) {
                    notebook.name = newName;
                    return notebook;
                }
            })
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
    moveNoteToTrashInNotebook,
    restoreNoteInNotebook,
    deleteNoteInNotebook,
    selectNotebook,
    changeNoteNotebook,
    renameNotebook
} = notebooksSlice.actions;

export const selectNotebooks = (state) => {
    return state.notebooks.notebooksArray;
}

export const selectTrashNotebook = (state) => {
    return state.notebooks.notebooksArray.find(notebook => notebook.id === 'trash-notebook');
}

export default notebooksSlice.reducer;