import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import * as notebooksService from './notebookService'

const initialState = {
    notebooksArray: [],
    notebookNotesArray: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getAllNotebooks = createAsyncThunk(
    'notes/getAllNotebooks',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await notebooksService.getAllNotebooks(token)
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

export const getNotebookNotes = createAsyncThunk(
  'notes/getNotebookNotes',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notebooksService.getNotebookNotes(id, token)
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

export const addNewNotebook = createAsyncThunk(
    'notes/addNewNotebook',
    async (newNotebook, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await notebooksService.addNewNotebook(newNotebook, token)
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

export const renameNotebook = createAsyncThunk(
    'notes/renameNotebook',
    async (obj, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await notebooksService.renameNotebook(obj, token)
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

export const deleteNotebook = createAsyncThunk(
    'notes/deleteNotebook',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await notebooksService.deleteNotebook(id, token)
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

export const addNoteToNotebook = createAsyncThunk(
    'notes/addNoteToNotebook',
    async (obj, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await notebooksService.addNoteToNotebook(obj, token)
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

export const deleteNoteInNotebook = createAsyncThunk(
    'notes/deleteNoteInNotebook',
    async (obj, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await notebooksService.deleteNoteInNotebook(obj, token)
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

const notebooksSlice = createSlice({
    name: 'notebooks',
    initialState,
    reducers: {
        resetNotebooks(state) {
          state.notebooksArray = []
          state.notebookNotesArray = []
          state.isError = false
          state.isSuccess = false
          state.isLoading = false
          state.message = ''
        },
        selectNotebook(state, action) {
            state.selectedNotebook = action.payload
        },
        addNoteToNotebookNotes(state, action) {
            const note = action.payload.note
            note._id = action.payload._id
            state.notebookNotesArray.push(note)
        },
        editNoteInNotebook(state, action) {
          const { _id, title, content } = action.payload
          const exsistingNote = state.notebookNotesArray.find(note => note._id === _id)
          if(exsistingNote) {
            exsistingNote.title = title
            exsistingNote.content = content
          }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotebooks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllNotebooks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllNotebooks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notebooksArray = action.payload
            })
            .addCase(getNotebookNotes.pending, (state) => {
              state.isLoading = true
            })
            .addCase(getNotebookNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getNotebookNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notebookNotesArray = action.payload
            })
            .addCase(addNewNotebook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addNewNotebook.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(addNewNotebook.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notebooksArray.push(action.payload)
            })
            .addCase(renameNotebook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(renameNotebook.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(renameNotebook.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const {_id, name} = action.payload

                state.notebooksArray.find(notebook => {
                    if(notebook._id === _id) {
                        notebook.name = name;
                        return notebook;
                    }
                    return null
                })
            })
            .addCase(deleteNotebook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteNotebook.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteNotebook.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notebooksArray = state.notebooksArray.filter(notebook => notebook._id !== action.payload)
            })
            .addCase(addNoteToNotebook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addNoteToNotebook.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(addNoteToNotebook.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
              
                state.notebooksArray.find(notebook => {
                    if(notebook._id === action.payload._id) {
                        notebook.notes = action.payload.notes
                    }
                    return null
                })
            })
            .addCase(deleteNoteInNotebook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteNoteInNotebook.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteNoteInNotebook.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                const { notebookUpdated: notebook } = action.payload
                state.notebookNotesArray = notebook.notes
                state.notebooksArray.find(notebookItem => {
                  if(notebookItem._id === notebook._id) {
                    notebookItem.notes = notebook.notes
                  }
                })
            })
    }
})

export const {
    resetNotebooks,
    selectNotebook,
    addNoteToNotebookNotes,
    editNoteInNotebook,
} = notebooksSlice.actions;

export const selectNotebooks = (state) => {
    return state.notebooks.notebooksArray;
}

export const selectNotebookNotes = (state) => {
  return state.notebooks.notebookNotesArray
}

export const selectTrashNotebook = (state) => {
  return state.notebooks.notebooksArray.find(notebook => notebook.role === 'trash')
}

export const selectCommonNotebook = (state) => {
  return state.notebooks.notebooksArray.find(notebook => notebook.role === 'common')
}

export default notebooksSlice.reducer