import  React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectNote } from '../notes/notesSlice'
import { selectNotebooks, getNotebookNotes, selectNotebookNotes } from '../notebooks/notebooksSlice'
import { TimeAgo } from '../notes/TimeAgo'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from '../../scss/features/notes/NotesList.module.scss'

export const NotebookNotesList = () => {
    const dispatch = useDispatch()
    let params = useParams()
    let { notebookId } = params
    const notebooks = useSelector(selectNotebooks)
    const notebook = notebooks ? notebooks.find(notebook => notebook._id === notebookId) : {}
    const notebookNotes = useSelector(selectNotebookNotes)
    const { isError, message } = useSelector(state => state.notebooks)

    useEffect(() => {
        if(isError) {
            console.log(message)
        }
        if(notebookId) {
            dispatch(getNotebookNotes(notebookId))
        }
    }, [dispatch, notebookId, isError, message])

    const markSelected = (note) => {
        dispatch(selectNote(note))
    }

    
    const renderNotes = notebookNotes.map(note => {
        const stripedHtmlContent = note.content.replace(/<[^>]+>/g, '')

        if(notebookNotes.length === 0) {
            return <div>Loading</div>
        } else {
            return(
                <div key={note._id} className={styles.notes_list__note} onClick={() => markSelected(note)}>
                        <h3 className={styles.notes_list__note_title}>{note.title}</h3>
                        <p className={styles.notes_list__note_text}>{stripedHtmlContent.slice(0, 40)}</p>
                        <p className={styles.notes_list__note_date}><TimeAgo timestamp={note.date} /></p>
                </div>
            )
        }
    }) 

    return(
        <div className={styles.notes_list}>
            <div className={styles.notes_list__head}>
                <h2 className={styles.notes_list__main_title}><FontAwesomeIcon icon="sticky-note" className={styles.notes_list__head_icon} />
                    {notebook ? notebook.name : 'Loading'}
                </h2>
                <p className={styles.notes_list__head_count}>{notebookNotes.length} {notebookNotes.length === 1 ? 'note' : 'notes'}</p>        
            </div>

            <div className={styles.notes_list__notes_container}>
                {renderNotes}
            </div>
        </div>
    )
}