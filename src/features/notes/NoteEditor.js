import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editNote, deleteNote, selectNote, selectSelectedNote } from './notesSlice';
import { changeNotebook } from '../notes/notesSlice';
import { editNoteInNotebook, 
        deleteNoteInNotebook, 
        selectNotebooks, 
        changeNoteNotebook } from '../notebooks/notebooksSlice';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import '../../scss/3d-party/ReactQuill.scss';

import { toggleMenu } from '../../app/helper-functions';
import styles from '../../scss/features/notes/NoteEditor.module.scss';
import commonCss from '../../scss/app/Common.module.scss';


export const NoteEditor = () => {
    const dispatch = useDispatch();
    const selectedNote = useSelector(selectSelectedNote);
    const notebooks = useSelector(selectNotebooks);
    const selectedNoteNotebook = notebooks.find(notenook => notenook.id === selectedNote.notebook);

    const onEditNoteTitle = (e) => {
        dispatch(editNote({id: selectedNote.id, title: e.target.value, content: selectedNote.content }));
        dispatch(editNoteInNotebook({id: selectedNote.id, title: e.target.value, content: selectedNote.content, notebookId: selectedNote.notebook }));
    }

    const onEditNoteContent = (e) => {
            dispatch(editNote({id: selectedNote.id, title: selectedNote.title, content: e.target.innerHTML}));
            dispatch(editNoteInNotebook({id: selectedNote.id, title: selectedNote.title, content: e.target.innerHTML, notebookId: selectedNote.notebook}));
    }

    const onDeleteNote = () => {
        dispatch(deleteNote(selectedNote.id));
        dispatch(deleteNoteInNotebook({id: selectedNote.id, notebookId: selectedNote.notebook}));
    }

    const onChangeNoteNotebook = (selectedNote, notebookId) => {
        dispatch(changeNotebook({selectedNote, notebookId}));
        dispatch(changeNoteNotebook({selectedNote, notebookId}));
    }

    return(
        <div className={styles.note_editor}>
            <div className={styles.note_editor_top}>
                <Link 
                    to={selectedNoteNotebook ? `/notebook/${selectedNoteNotebook.id}` : ''} 
                    className={`${styles.note_editor__top_item} ${commonCss.link}`}>
                    <FontAwesomeIcon icon="book" className={styles.note_editor__notebook_icon} />
                    <p className={styles.note_editor__notebook_name}>{selectedNoteNotebook ? selectedNoteNotebook.name : ''}</p>
                </Link>

                <div className={`${commonCss.actions_menu} actions_menu ${selectedNote.id ? 'change-notebook-active' : ''}`}>
                    <button 
                        className={`${commonCss.actions_menu__togle_btn} ${commonCss.btn} ${commonCss.actions_menu_change_notebook_btn}`} 
                        onClick={toggleMenu}>
                        <FontAwesomeIcon icon="exchange-alt" className={commonCss.actions_menu__icon} />
                    </button>  
                    <div className={commonCss.actions_menu__container}>
                        {notebooks.map(notebook => {
                            return(<p className={commonCss.actions_menu__item} onClick={() => onChangeNoteNotebook(selectedNote, notebook.id)}>{notebook.name}</p>)
                        })}
                    </div>
                </div>

                <div className={`${commonCss.actions_menu} ${commonCss.actions_menu___right} actions_menu`}>
                    <button className={`${commonCss.actions_menu__togle_btn} ${commonCss.btn}`} onClick={toggleMenu}>
                        <FontAwesomeIcon icon="ellipsis-h" className={commonCss.actions_menu__icon} />
                    </button>  
                    <div className={commonCss.actions_menu__container}>
                        <p className={commonCss.actions_menu__item}>Move</p>
                        <p className={commonCss.actions_menu__item} onClick={onDeleteNote}>Delete</p>
                    </div>
                </div>
            </div>
            <input type="text" 
                name="title" 
                id="note-title" 
                className={styles.note_editor__note_title}
                value={selectedNote.title}
                onChange={onEditNoteTitle}
                />
            <ReactQuill
                theme="snow"
                className={styles.note_editor__text_editor}
                value={selectedNote.content}
                onKeyUp={onEditNoteContent}
            />
            {/* <textarea name="text" 
                id="note-text" 
                className={styles.note_editor__text_editor}
                value={selectedNote.text}
                onChange={onEditNoteText}
                ></textarea> */}
        </div>
    )
}