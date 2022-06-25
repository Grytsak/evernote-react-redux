import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotebookNotes, selectTrashNotebookId, selectTrashNotebook, getNotebookNotes } from './notebooksSlice';
import { selectNote } from '../notes/notesSlice';

import { TimeAgo } from '../notes/TimeAgo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../scss/features/notes/NotesList.module.scss';



export const NotebookTrash = () => {
    const dispatch = useDispatch()
    const notebookTrash = useSelector(selectTrashNotebook)
    const notebookTrashId = useSelector(selectTrashNotebookId)
    const notebookNotes = useSelector(selectNotebookNotes)
    const { isError, message } = useSelector(state => state.notebooks)

    useEffect(() => {
        if(isError) {
            console.log(message)
        } 
        if(notebookTrashId) {
            dispatch(getNotebookNotes(notebookTrashId))
        }
    }, [dispatch, notebookTrashId, isError, message])

    const markSelected = (note) => {
        dispatch(selectNote(note))
    }

    const renderNotes = notebookNotes.map(note => {
        const stripedHtmlContent = note.content ? note.content.replace(/<[^>]+>/g, '') : ''

        if(notebookNotes.length === 0) {
            return <div>Loading</div>
        } else {
            return(
                <div key={note._id} className={styles.notes_list__note} onClick={() => markSelected(note)}>
                        <h3 className={styles.notes_list__note_title}>{note.title}</h3>
                        <p className={styles.notes_list__note_text}>{stripedHtmlContent}</p>
                        <p className={styles.notes_list__note_date}><TimeAgo timestamp={note.date} /></p>
                </div>
            )
        }
    }) 

    return(
        <div className={styles.notes_list}>
            <div className={styles.notes_list__head}>
                <h2 className={styles.notes_list__main_title}>
                    <FontAwesomeIcon icon="trash" className={styles.notes_list__head_icon} />{notebookTrash ? notebookTrash.name : 'Trash'}
                </h2>
                <p className={styles.notes_list__head_count}>{notebookNotes.length} {notebookNotes.length === 1 ? 'note' : 'notes'}</p>        
            </div>

            <div className={styles.notes_list__notes_container}>
                {renderNotes}
            </div>
        </div>
    )
}