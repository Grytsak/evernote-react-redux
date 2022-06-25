import React from 'react';
import { useDispatch } from 'react-redux';
import { addNewNotebook } from './notebooksSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuid from 'react-uuid';

import styles from '../../scss/features/notebooks/AddNewNotebook.module.scss';
import commonCss from '../../scss/app/Common.module.scss';

export const AddNewNotebook = () => {
    const dispatch = useDispatch();

    const onAddNewNotebook = () => {
        const inputName = document.getElementById('notebook-input');

        if (inputName.value) {
            dispatch(addNewNotebook({
                name: inputName.value,
                notes: [],
                date: new Date().toISOString()
            }));
            inputName.value = '';
            closePopup();
        }
    }
    
    const openPopup = () => {
        const popup = document.getElementById('add-notebook-popup');
        popup.style.display = 'flex';
    }

    const closePopup = () => {
        const popup = document.getElementById('add-notebook-popup');
        popup.style.display = 'none';
    }

    return(
        <div className={styles.add_notebook}>
            <button className={`${styles.add_notebook__btn} ${commonCss.btn}`} onClick={openPopup}>
                    <FontAwesomeIcon icon="book-medical" className={styles.add_notebook__icon} />
                    Add Notebook
            </button>

            <div className={styles.add_notebook__popup} id='add-notebook-popup'>
                <div className={styles.add_notebook__popup_container}>
                    <FontAwesomeIcon icon="times" className={styles.add_notebook__popup_close} onClick={closePopup} />
                    <h3 className={styles.add_notebook__popup_title}>Create new notebook</h3>
                    <input type='text' className={styles.add_notebook__name_input} id='notebook-input' />
                    <button className={`${styles.add_notebook__popup_add_btn} ${commonCss.btn___main} ${commonCss.btn___success}`} onClick={onAddNewNotebook}>Add Notebook</button>
                </div>
            </div>
        </div>
        
    )
}