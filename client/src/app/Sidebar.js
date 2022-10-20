import  React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link, useLocation  } from "react-router-dom"
import { addNewNote } from '../features/notes/notesSlice'
import { 
    resetNotebooks,
    selectCommonNotebook, 
    addNoteToNotebook, 
    addNoteToNotebookNotes 
} from '../features/notebooks/notebooksSlice'
import { selectMostRecentlyCreatedNoteId, resetNotes} from '../features/notes/notesSlice'
import { selectUser, logout, resetAuth } from '../features/auth/authSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import styles from '../scss/app/Sidebar.module.scss'

export const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector(selectUser)
    const commonNotebook = useSelector(selectCommonNotebook)
    const lastCreatedNoteId = useSelector(selectMostRecentlyCreatedNoteId)
    const [createdNoteNotebook, setCreatedNoteNotebook] = useState('')
    const [note, setNote] = useState({})

    const addNote = () => {
        const note = {
            user: user._id,
            title: 'Untitled',
            content: 'content',
            notebook: /notebook\/.*\S.*/.exec(location.pathname) ? location.pathname.split('/').pop() : commonNotebook._id,
            inTrash: false,
            beforeTrashNotebook: ''
        }
        setCreatedNoteNotebook(note.notebook)
        dispatch(addNewNote(note))
        setNote(note)
    }

    useEffect(() => {
        if(lastCreatedNoteId) {
            dispatch(addNoteToNotebook({noteID: lastCreatedNoteId, notebookID: createdNoteNotebook}))
            dispatch(addNoteToNotebookNotes({note, _id: lastCreatedNoteId}))
        }
    }, [lastCreatedNoteId])

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    }, [user])



    const onLogout = () => {
        dispatch(logout())
        dispatch(resetAuth())
        dispatch(resetNotes())
        dispatch(resetNotebooks())
    }

    
    return(
        <div className={styles.sidebar}>
            <div className={styles.sidebar__item}>
                <FontAwesomeIcon icon="user" className={styles.sidebar__icon} /> 
                {user ? user.name : "Loading..."}
            </div>
            <div className={`${styles.sidebar__item} ${location.pathname.split('/').pop() === 'trash-notebook' ? 'inactive' : ''}`} onClick={addNote}>
                <FontAwesomeIcon icon="plus" className={styles.sidebar__icon} /> 
                Add New
            </div>
            <div className={styles.sidebar__item}>
                <Link to="/notes" className={styles.sidebar__link}>
                    <FontAwesomeIcon icon="sticky-note" className={styles.sidebar__icon} /> 
                    Notes
                </Link>
            </div>
            {/* <div className={styles.sidebar__item}>
                <FontAwesomeIcon icon="tasks" className={styles.sidebar__icon} /> 
                Tasks
            </div> */}
            <div className={styles.sidebar__item}>
                <Link to="/notebooks" className={styles.sidebar__link}>
                    <FontAwesomeIcon icon="book" className={styles.sidebar__icon} /> 
                    Notebooks
                </Link>
            </div>
            {/* <div className={styles.sidebar__item}>
                <FontAwesomeIcon icon="tag" className={styles.sidebar__icon} /> 
                Tags
            </div> */}
            <div className={styles.sidebar__item}>
                <Link to="/notebook/trash-notebook" className={styles.sidebar__link}>
                    <FontAwesomeIcon icon="trash" className={styles.sidebar__icon} /> 
                    Trash
                </Link>
            </div>
            <div className={styles.sidebar__item} onClick={onLogout}>
                <FontAwesomeIcon icon="sign-out-alt" className={styles.sidebar__icon} />
                Logout
            </div>
        </div>
    )
}