import './App.css'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Routes, Route } from "react-router-dom"

import { selectUser } from './features/auth/authSlice'
import { 
  getAllNotebooks, 
  selectTrashNotebook, 
  selectCommonNotebook,
} from './features/notebooks/notebooksSlice'
import { getAllNotes } from './features/notes/notesSlice'

import Register from './app/Register'
import Login from './app/Login'
import { PageSidebar } from './app/PageSidebar'
import { NotesList } from './features/notes/NotesList'
import { NoteEditor } from './features/notes/NoteEditor'
import { NotebookList } from './features/notebooks/NotebooksList'
import { NotebookNotesList } from './features/notebooks/NotebookNotesList'
import { NotebookTrash } from './features/notebooks/NotebookTrash'

library.add(fas);

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isError: isErrorNote, message: messageNote } = useSelector(state => state.notes)
  const { isError: isErrorNotebook, message: messageNotebook } = useSelector(state => state.notebooks)
  const user = useSelector(selectUser)
  // const trashNotebook = useSelector(selectTrashNotebook)
  // const commonNotebook = useSelector(selectCommonNotebook)



  useEffect(() => {
      if(!user) {
        // navigate('/login')
      }
  }, [])

  useEffect(() => {
      if(isErrorNotebook) console.log(messageNotebook)
      if(user) {
        dispatch(getAllNotebooks())
        // if(commonNotebook && trashNotebook) {
        //   dispatch(addCommonNotebook(commonNotebook._id))
        //   dispatch(addTrashNotebook(trashNotebook._id))
        // }
      }
      
  }, [user, isErrorNotebook, messageNotebook, dispatch])

  useEffect(() => {
      if(isErrorNote) console.log(messageNote)
      dispatch(getAllNotes())
  }, [user, isErrorNote, messageNote, dispatch])

  return (
      <div className="App">
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<PageSidebar />} >
            <Route 
              path="notes" 
              element={<><NotesList /><NoteEditor /></>}>
            </Route>
            <Route
              path='note/:noteId'
              element={<NoteEditor />}>
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
              path='notebook/trash-notebook'
              element={<><NotebookTrash /><NoteEditor /></>}>
            </Route>
          </Route>
        </Routes>
      </div>
  );
}

export default App;
