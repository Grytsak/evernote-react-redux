import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectNotebooks } from './notebooksSlice';
import { selectNote } from '../notes/notesSlice';
import { toggleMenu } from '../../app/helper-functions';

import { AddNewNotebook } from './AddNewNotebook';
import { RenameNotebookPopup } from './RenameNotebookPopup';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../../scss/features/notebooks/NotebooksList.module.scss';
import commonCss from '../../scss/app/Common.module.scss';

export const NotebookList = () => {
    const dispatch = useDispatch();
    const noteBooks = useSelector(selectNotebooks);

    const toggleNotes = (e) => {
        const notebookItem = e.target.closest('.notebook-item-container');
        notebookItem.classList.toggle('active');
    }

    const markSelected = (note) => {
        dispatch(selectNote(note));
    }

    const openPopup = (id) => {
        document.body.classList.add('active-popup');
        document.querySelector('.notebook-rename-popup').setAttribute('data-notebook-id', id);
    }

    const renderNotebooks = noteBooks.filter( notebook => {
        if(notebook.id === 'trash-notebook') {
            return false;
        } 
        return true;
    }).map(notebook => {
        const notes = notebook.notes;

        const renderNotebookNotes = notes.map(note => {
            return (
                <div key={note.id} className={styles.notebooks_list__notes_item}>
                            <p className={styles.notebooks_list__notebook_name}>
                                <Link to={`/note/${note.id}`} className={styles.notebooks_list__notebook_name_link} onClick={() => markSelected(note)}>
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
            <div key={notebook.id} className={`${styles.notebooks_list__list_item_container} notebook-item-container`}>
                    <div className={styles.notebooks_list__list_item}>
                        <FontAwesomeIcon icon="caret-right" className={styles.notebooks_list__carret_icon} onClick={toggleNotes} />
                        <p className={styles.notebooks_list__notebook_name}>
                            <Link to={`/notebook/${notebook.id}`} className={styles.notebooks_list__notebook_name_link}>
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
                                <p className={commonCss.actions_menu__item} onClick={() => openPopup(notebook.id)}>Rename</p> 
                                : ''}
                                <p className={commonCss.actions_menu__item}>Add New Note</p>
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
            <RenameNotebookPopup />
        </div>
    )
}