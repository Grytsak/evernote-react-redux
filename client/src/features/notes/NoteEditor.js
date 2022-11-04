import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
        editNote, 
        moveNoteToTrash,
        deleteNote,
        changeNotebook,
        restoreNote,
        selectSelectedNote
    } from './notesSlice';    
import { 
        selectTrashNotebook,
        selectCommonNotebook,
        addNoteToNotebook,
        deleteNoteInNotebook,
        selectNotebooks,
        editNoteInNotebook
    } from '../notebooks/notebooksSlice';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import debounce from 'lodash.debounce';

import '../../scss/3d-party/ReactQuill.scss';

import { toggleMenu } from '../../app/helper-functions';
import styles from '../../scss/features/notes/NoteEditor.module.scss';
import commonCss from '../../scss/app/Common.module.scss';


export const NoteEditor = () => {
    const dispatch = useDispatch()
    const trashNotebook = useSelector(selectTrashNotebook)
    const commonNotebook = useSelector(selectCommonNotebook)
    const selectedNote = useSelector(selectSelectedNote)
    const notebooks = useSelector(selectNotebooks)
    const selectedNoteNotebook = notebooks.find(notebook => notebook._id === selectedNote.notebook)
    const beforeTrash = notebooks.find(notebook => notebook._id === selectedNote.beforeTrashNotebook)
    const [titleValue, setTitleValue] = useState('')
    const [contentValue, setContentValue] = useState()
    const [timer, setTimer] = useState(null)

    useEffect(() => {
        if(selectedNote._id) {
            setTitleValue(selectedNote.title)
            setContentValue(selectedNote.content)
            console.log('useEffect:', selectedNote.content)
        }
    }, [selectedNote._id])

    const onEditNoteTitle = (e) => {
        setTitleValue(e.target.value)
        clearTimeout(timer)

        const newTimer = setTimeout(() => {
            dispatch(editNote({_id: selectedNote._id, title: e.target.value, content: selectedNote.content }))
            dispatch(editNoteInNotebook({_id: selectedNote._id, title: e.target.value, content: selectedNote.content}))
          }, 1000)
      
          setTimer(newTimer)
    }

    const onEditNoteContent = (val) => {
        setContentValue(val)
        clearTimeout(timer)

        const newTimer = setTimeout(() => {
            dispatch(editNote({_id: selectedNote._id, title: selectedNote.title, content: val}))
            dispatch(editNoteInNotebook({_id: selectedNote._id, title: selectedNote.title, content: val}))
          }, 1000)
      
          setTimer(newTimer)
    }

    const onChangeNoteNotebook = (selectedNote, notebookId) => {
        dispatch(changeNotebook({_id: selectedNote._id, notebook: notebookId}))
        dispatch(deleteNoteInNotebook({noteID: selectedNote._id, notebookID: selectedNote.notebook}))
        dispatch(addNoteToNotebook({noteID: selectedNote._id, notebookID: notebookId}))
    }

    const onNoteMoveToTrash = () => {
        if(selectedNote._id) {
            dispatch(moveNoteToTrash({
                _id: selectedNote._id, 
                notebook: trashNotebook._id, 
                inTrash: true, 
                beforeTrashNotebook: selectedNote.notebook
            }))
            dispatch(deleteNoteInNotebook({noteID: selectedNote._id, notebookID: selectedNote.notebook}))
            dispatch(addNoteToNotebook({noteID: selectedNote._id, notebookID: trashNotebook._id}))
        }
    }

    const onRestoreNote = () => {
        dispatch(restoreNote({
            _id: selectedNote._id, 
            notebook: beforeTrash ? selectedNote.beforeTrashNotebook : commonNotebook._id, 
            inTrash: false, 
            beforeTrashNotebook: ''
        }))
        dispatch(deleteNoteInNotebook({noteID: selectedNote._id, notebookID: trashNotebook._id}))
        dispatch(addNoteToNotebook({noteID: selectedNote._id, notebookID: beforeTrash ? selectedNote.beforeTrashNotebook : commonNotebook._id}))
    }

    const onDeleteNote = () => {
        dispatch(deleteNote(selectedNote._id));
        dispatch(deleteNoteInNotebook({noteID: selectedNote._id, notebookID: trashNotebook._id}));
    }



    let buttonsTrash = '';
    if(selectedNote.inTrash) {
        buttonsTrash = 
            <div>
                <p className={`${commonCss.actions_menu__item} ${selectedNote._id ? '' : commonCss.actions_menu__item_inactive}`} onClick={onDeleteNote}>Delete</p>
                <p className={`${commonCss.actions_menu__item} ${selectedNote._id ? '' : commonCss.actions_menu__item_inactive}`} onClick={onRestoreNote}>Restore</p>
            </div> 
    } else {
        buttonsTrash = <p className={`${commonCss.actions_menu__item} ${selectedNote._id ? '' : commonCss.actions_menu__item_inactive}`} onClick={onNoteMoveToTrash}>Move to Trash</p>
    }

    return(
        <div className={styles.note_editor}>
            <div className={styles.note_editor_top}>
                <Link 
                    to={selectedNoteNotebook ? `/notebook/${selectedNoteNotebook._id}` : ''} 
                    className={`${styles.note_editor__top_item} ${commonCss.link}`}>
                    <FontAwesomeIcon icon="book" className={styles.note_editor__notebook_icon} />
                    <p className={styles.note_editor__notebook_name}>{selectedNoteNotebook ? selectedNoteNotebook.name : ''}</p>
                </Link>

                <div className={`${commonCss.actions_menu} actions_menu ${selectedNote._id ? 'change-notebook-active' : ''}`}>
                    <button 
                        className={`
                        ${commonCss.actions_menu__togle_btn} 
                        ${commonCss.btn} 
                        ${commonCss.actions_menu_change_notebook_btn} 
                        ${selectedNote.inTrash ? 'hide' : ''}
                        `} 
                        onClick={toggleMenu}>
                        <FontAwesomeIcon icon="exchange-alt" className={commonCss.actions_menu__icon} />
                    </button>  
                    <div className={`${commonCss.actions_menu__container} actions_menu_elements`}>
                        {notebooks.filter((notebook) => notebook._id !== trashNotebook._id && notebook._id !== selectedNote.notebook )
                        .map((notebook, index) => {
                            return(<p key={index} className={commonCss.actions_menu__item} onClick={() => onChangeNoteNotebook(selectedNote, notebook._id)}>{notebook.name}</p>)
                        })}
                    </div>
                </div>

                <div className={`${commonCss.actions_menu} ${commonCss.actions_menu___right} actions_menu`}>
                    <button className={`${commonCss.actions_menu__togle_btn} ${commonCss.btn}`} onClick={toggleMenu}>
                        <FontAwesomeIcon icon="ellipsis-h" className={commonCss.actions_menu__icon} />
                    </button>  
                    <div className={`${commonCss.actions_menu__container} actions_menu_elements`}>
                        <p className={`${commonCss.actions_menu__item} ${selectedNote._id ? '' : commonCss.actions_menu__item_inactive}`}>Move</p> 
                        {buttonsTrash}
                    </div>
                </div>
            </div>
            <input type="text" 
                name="title" 
                id="note-title" 
                className={styles.note_editor__note_title}
                value={titleValue}
                onChange={onEditNoteTitle}
                />
            <ReactQuill
                theme="snow"
                className={styles.note_editor__text_editor}
                value={contentValue}
                onChange={onEditNoteContent}
            />
        </div>
    )
}