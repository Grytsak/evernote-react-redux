import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as notesService from './notesService'

const initialState = {
  notesArray: [],
  selectedNote: {
    _id: '',
    title: '',
    content: '',
    notebook: '',
    date: '',
    inTrash: false,
    beforeTrashNotebook: ''
  },
  lastCreatedNoteId: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getAllNotes = createAsyncThunk(
  'notes/getAllNotes',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notesService.getAllNotes(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addNewNote = createAsyncThunk(
  'notes/addNewNote',
  async (newNote, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notesService.addNewNote(newNote, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const editNote = createAsyncThunk(
  'notes/editNote',
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notesService.editNote(obj, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const changeNotebook = createAsyncThunk(
  'notes/changeNotebook',
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notesService.changeNotebook(obj, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const moveNoteToTrash = createAsyncThunk(
  'notes/moveNoteToTrash',
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notesService.moveNoteToTrash(obj, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const restoreNote = createAsyncThunk(
  'notes/restoreNote',
  async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notesService.restoreNote(obj, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notesService.deleteNote(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)



const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    resetNotes(state) {
      state.notesArray = []
      state.selectedNote = {
        _id: '',
        title: '',
        content: '',
        notebook: '',
        date: '',
        inTrash: false,
        beforeTrashNotebook: ''
      }
      state.lastCreatedNoteId = ''
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
    selectNote(state, action) {
      state.selectedNote = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notesArray = action.payload
      })
      .addCase(addNewNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(addNewNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.lastCreatedNoteId = action.payload._id
        state.notesArray.push(action.payload)
      })
      .addCase(editNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        const { _id, title, content } = action.payload
        const exsistingNote = state.notesArray.find(note => note._id === _id)
        const selectedNote = state.selectedNote

        if (exsistingNote && selectedNote) {
          exsistingNote.title = title
          selectedNote.title = title
          exsistingNote.content = content
          selectedNote.content = content
        }
      })
      .addCase(changeNotebook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changeNotebook.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(changeNotebook.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        const { _id, notebook } = action.payload;

        state.notesArray.find(note => {
          if (note._id === _id) {
            note.notebook = notebook;
            state.selectedNote.notebook = notebook;
          }
        })
      })
      .addCase(moveNoteToTrash.pending, (state) => {
        state.isLoading = true
      })
      .addCase(moveNoteToTrash.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(moveNoteToTrash.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        const { _id, notebook, inTrash, beforeTrashNotebook } = action.payload;
        state.notesArray.find(note => {
          if (note._id === _id) {
            note.notebook = notebook;
            note.inTrash = inTrash;
            note.beforeTrashNotebook = beforeTrashNotebook;
            state.selectedNote.notebook = notebook;
            state.selectedNote.beforeTrashNotebook = beforeTrashNotebook;
            state.selectedNote.title = '';
            state.selectedNote.content = '';
            return note;
          }
        });
      })
      .addCase(restoreNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(restoreNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(restoreNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        const { _id, notebook, inTrash } = action.payload;
        state.notesArray.find(note => {
          if (note._id === _id) {
            note.notebook = notebook;
            note.inTrash = inTrash;
            note.beforeTrashNotebook = '';
            state.selectedNote.notebook = notebook;
            state.selectedNote.beforeTrashNotebook = '';
            state.selectedNote.title = '';
            state.selectedNote.content = '';
            return note;
          }
        })
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true

        state.notesArray = state.notesArray.filter(note => note._id !== action.payload)
      })
  }
});

export const {
  resetNotes,
  selectNote
} = notesSlice.actions;

export const selectNotes = (state) => {
  return state.notes.notesArray.filter(note => note.notebook !== state.notes.trashNotebookId)
}

export const selectSelectedNote = (state) => {
  return state.notes.selectedNote
}

export const selectMostRecentlyCreatedNoteId = (state) => {
  return state.notes.lastCreatedNoteId
}

export default notesSlice.reducer;