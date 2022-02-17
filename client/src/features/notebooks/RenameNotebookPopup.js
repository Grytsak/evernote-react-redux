import React from "react";
import { useDispatch } from 'react-redux';
import { renameNotebook } from './notebooksSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import commonCss from '../../scss/app/Common.module.scss';

export const RenameNotebookPopup = (props) => {
    const dispatch = useDispatch();
    const closePopup = () => {
        document.body.classList.remove('active-popup');
    }

    const onRenameNotebook = () => {
        let value = document.querySelector('.rename-notebook-popup').value;
        let notebookId = document.querySelector('.notebook-rename-popup').getAttribute('data-notebook-id');

        dispatch(renameNotebook({id: notebookId, newName: value}));
        document.body.classList.remove('active-popup');
    }

    return(
        <div className={`${commonCss.main_popup} notebook-rename-popup`}>
            <div className={commonCss.main_popup__container}>
                <FontAwesomeIcon icon="times" className={commonCss.main_popup__popup_close} onClick={closePopup} />
                <h3 className={commonCss.main_popup__title}>Rename Notebook</h3>
                <input type='text' className={`${commonCss.main_popup__input} rename-notebook-popup`} />
                <button onClick={onRenameNotebook} className={`${commonCss.btn___main} ${commonCss.btn___success}`}>Rename</button>
            </div>
        </div>
    )
}