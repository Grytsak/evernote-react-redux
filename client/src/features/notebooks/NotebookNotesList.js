import  React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectNote } from '../notes/notesSlice';
import { selectNotebooks } from '../notebooks/notebooksSlice';
import { TimeAgo } from '../notes/TimeAgo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../scss/features/notes/NotesList.module.scss';

export const NotebookNotesList = () => {
    const dispatch = useDispatch();
    let params = useParams();
    let { notebookId } = params;
    const notebooks = useSelector(selectNotebooks);
    let notebook = notebooks.find(notebook => notebook.id === notebookId);
    let notes = notebook.notes;

    const markSelected = (note) => {
        dispatch(selectNote(note))
    }

    
    const renderNotes = notes.map(note => {
        const stripedHtmlContent = note.content.replace(/<[^>]+>/g, '');

        return(
            <div key={note.id} className={styles.notes_list__note} onClick={() => markSelected(note)}>
                    <h3 className={styles.notes_list__note_title}>{note.title}</h3>
                    <p className={styles.notes_list__note_text}>{stripedHtmlContent}</p>
                    <p className={styles.notes_list__note_date}><TimeAgo timestamp={note.date} /></p>
            </div>
        )
    }) 

    return(
        <div className={styles.notes_list}>
            <div className={styles.notes_list__head}>
                <h2 className={styles.notes_list__main_title}><FontAwesomeIcon icon="sticky-note" className={styles.notes_list__head_icon} />{notebook.name}</h2>
                <p className={styles.notes_list__head_count}>{notes.length} {notes.length === 1 ? 'note' : 'notes'}</p>        
            </div>

            <div className={styles.notes_list__notes_container}>
                {renderNotes}
            </div>
        </div>
    )
}