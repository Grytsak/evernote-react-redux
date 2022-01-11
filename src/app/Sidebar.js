import  React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { addNewNote } from '../features/notes/notesSlice';
import { addNoteToNotebook } from '../features/notebooks/notebooksSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'react-uuid';


import styles from '../scss/app/Sidebar.module.scss';

export const Sidebar = () => {
    const dispath = useDispatch();


    const addNote = () => {
        const note = {
            id: uuid(),
            title: 'Untitled',
            content: 'content',
            date: new Date().toISOString(),
            notebook: /notebook\/.*\S.*/.exec(window.location.href) ? window.location.href.split('/').pop() : 'common-notebook'
        }
        dispath(addNewNote(note))
        dispath(addNoteToNotebook({note, url: window.location.href}))
    }
    
    return(
        <div className={styles.sidebar}>
            <div className={styles.sidebar__item} onClick={addNote}>
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
                <FontAwesomeIcon icon="trash" className={styles.sidebar__icon} /> 
                Trash
            </div>
        </div>
    )
}