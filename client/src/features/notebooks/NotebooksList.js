import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
        selectNotebooks, 
        selectTrashNotebook,
        selectCommonNotebook,
        addNoteToNotebook,
        deleteNoteInNotebook,
        deleteNotebook 
    } from './notebooksSlice';
import { selectNote, moveNoteToTrash } from '../notes/notesSlice';
import { toggleMenu } from '../../app/helper-functions';

import { AddNewNotebook } from './AddNewNotebook';
import { RenameNotebookPopup } from './RenameNotebookPopup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../scss/features/notebooks/NotebooksList.module.scss';
import commonCss from '../../scss/app/Common.module.scss';

export const NotebookList = () => {
    const dispatch = useDispatch();
    const noteBooks = useSelector(selectNotebooks);
    const trashNotebook = useSelector(selectTrashNotebook)
    const commonNotebook = useSelector(selectCommonNotebook)

    const [notebookId, setNotebookId] = useState('')
    const [notebookName, setNotebookName] = useState('')

    const toggleNotes = (e) => {
        const notebookItem = e.target.closest('.notebook-item-container');
        notebookItem.classList.toggle('active');
    }

    const markSelected = (note) => {
        dispatch(selectNote(note));
    }

    const openPopup = (id, name) => {
        document.body.classList.add('active-popup')
        setNotebookId(id)
        setNotebookName(name)
    }

    const onDeleteNotebook = (id) => {
        const notebook = noteBooks.find(notebook => notebook._id === id)
        const notebookNotes = notebook.notes
        const deleteNotebookCallback = () => dispatch(deleteNotebook(id))

        if(notebookNotes.length > 0) {
            notebookNotes.forEach((note, index) => {
                dispatch(moveNoteToTrash({
                    _id: note, 
                    notebook: trashNotebook._id, 
                    inTrash: true, 
                    beforeTrashNotebook: commonNotebook._id
                }))
                dispatch(deleteNoteInNotebook({noteID: note, notebookID: notebook._id}))
                dispatch(addNoteToNotebook({noteID: note, notebookID: trashNotebook._id}))
                if(index === notebookNotes.length - 1) {
                    deleteNotebookCallback(id)
                }
            })
        } else {
            deleteNotebookCallback(id)
        }
    }


    const renderNotebooks = noteBooks.filter( notebook => {
        if(notebook._id === trashNotebook._id) {
            return false;
        } 
        return true;
    }).map(notebook => {
        const notes = notebook.notes

        const renderNotebookNotes = notes.map(note => {
            return (
                <div key={note} className={styles.notebooks_list__notes_item}>
                            <p className={styles.notebooks_list__notebook_name}>
                                <Link to={`/note/${note}`} className={styles.notebooks_list__notebook_name_link} onClick={() => markSelected(note)}>
                                    <FontAwesomeIcon icon="sticky-note" className={styles.notebooks_list__notebook_icon} />
                                    {note.title}
                                </Link>
                            </p>
                            <div className={`${commonCss.actions_menu} ${commonCss.actions_menu___right} actions_menu`}>
                                <button className={`${commonCss.actions_menu__togle_btn} ${commonCss.btn}`} onClick={toggleMenu}>
                                    <FontAwesomeIcon icon="ellipsis-h" className={commonCss.actions_menu__icon} />
                                </button>  
                                <div className={`${commonCss.actions_menu__container} actions_menu_elements`}>
                                    <p className={commonCss.actions_menu__item}>Rename</p>
                                    <p className={commonCss.actions_menu__item}>Delete</p>
                                </div>
                            </div>
                </div>
            )
        })

        return(
            <div key={notebook._id} className={`${styles.notebooks_list__list_item_container} notebook-item-container`}>
                    <div className={styles.notebooks_list__list_item}>
                        <FontAwesomeIcon icon="caret-right" className={styles.notebooks_list__carret_icon} onClick={toggleNotes} />
                        <p className={styles.notebooks_list__notebook_name}>
                            <Link to={`/notebook/${notebook._id}`} className={styles.notebooks_list__notebook_name_link}>
                                <FontAwesomeIcon icon="book" className={styles.notebooks_list__notebook_icon} />
                                {notebook.name}
                            </Link> 
                        </p>
                        <span className={styles.notebooks_list__notebook_notes_count}>({notes.length})</span>
                        <div className={`${commonCss.actions_menu} ${commonCss.actions_menu___right} actions_menu actions_menu___right`}>
                            <button className={`${commonCss.actions_menu__togle_btn} ${commonCss.btn}`} onClick={toggleMenu}>
                                <FontAwesomeIcon icon="ellipsis-h" className={commonCss.actions_menu__icon} />
                            </button>  
                            <div className={`${commonCss.actions_menu__container} actions_menu_elements`}>
                                {notebook.id !== 'common-notebook' ? 
                                <p className={commonCss.actions_menu__item} onClick={() => openPopup(notebook._id, notebook.name)}>Rename</p> 
                                : ''}
                                <p className={commonCss.actions_menu__item}>Add New Note</p>
                                <p className={`
                                ${commonCss.actions_menu__item} 
                                ${notebook._id === commonNotebook._id 
                                ? commonCss.actions_menu__item_inactive : ''}
                                `} onClick={() => onDeleteNotebook(notebook._id)}>Delete</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.notebooks_list__notes}>{renderNotebookNotes}</div>
                </div>
        )
    })

    return(
        <div className={styles.notebooks_list}>
            <h1 className={styles.notebooks_list__title}>Notebooks</h1>
            <div className={styles.notebooks_list__top}>
                <p className={styles.notebooks_list__notebooks_count}>{noteBooks.length - 1} {noteBooks.length === 1 ? 'notebook' : 'notebooks'}</p>
                <AddNewNotebook />
            </div>

            <div className={styles.notebooks_list__list_container}>{renderNotebooks}</div>
            <RenameNotebookPopup notebookId={notebookId} notebookName={notebookName} />
        </div>
    )
}