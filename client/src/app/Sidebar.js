import  React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation  } from "react-router-dom"
import { addNewNote } from '../features/notes/notesSlice'
import { selectCommonNotebookId, addNoteToNotebook, addNoteToNotebookNotes } from '../features/notebooks/notebooksSlice'
import { selectMostRecentlyCreatedNoteId } from '../features/notes/notesSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import styles from '../scss/app/Sidebar.module.scss'

export const Sidebar = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const commonNotebookId = useSelector(selectCommonNotebookId)
    const lastCreatedNoteId = useSelector(selectMostRecentlyCreatedNoteId)
    const [createdNoteNotebook, setCreatedNoteNotebook] = useState('')
    const [note, setNote] = useState({})

    const addNote = () => {
        const note = {
            title: 'Untitled',
            content: 'content',
            notebook: /notebook\/.*\S.*/.exec(location.pathname) ? location.pathname.split('/').pop() : commonNotebookId,
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



    
    return(
        <div className={styles.sidebar}>
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
            <div className={styles.sidebar__item}>
                <FontAwesomeIcon icon="tasks" className={styles.sidebar__icon} /> 
                Tasks
            </div>
            <div className={styles.sidebar__item}>
                <Link to="/notebooks" className={styles.sidebar__link}>
                    <FontAwesomeIcon icon="book" className={styles.sidebar__icon} /> 
                    Notebooks
                </Link>
            </div>
            <div className={styles.sidebar__item}>
                <FontAwesomeIcon icon="tag" className={styles.sidebar__icon} /> 
                Tags
            </div>
            <div className={styles.sidebar__item}>
                <Link to="/notebook/trash-notebook" className={styles.sidebar__link}>
                    <FontAwesomeIcon icon="trash" className={styles.sidebar__icon} /> 
                    Trash
                </Link>
            </div>
        </div>
    )
}