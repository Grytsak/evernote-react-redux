import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { renameNotebook } from './notebooksSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import commonCss from '../../scss/app/Common.module.scss';

export const RenameNotebookPopup = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    useEffect(() => {
        setName(props.notebookName)
    }, [props.notebookName])

    const closePopup = () => {
        document.body.classList.remove('active-popup')
    }

    const onRenameNotebook = () => {
        let value = document.querySelector('.rename-notebook-popup').value

        dispatch(renameNotebook({_id: props.notebookId, name: value}))
        document.body.classList.remove('active-popup')
    }

    return(
        <div className={`${commonCss.main_popup} notebook-rename-popup`}>
            <div className={commonCss.main_popup__container}>
                <FontAwesomeIcon icon="times" className={commonCss.main_popup__popup_close} onClick={closePopup} />
                <h3 className={commonCss.main_popup__title}>Rename Notebook</h3>
                <input 
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    value={name}
                    className={`${commonCss.main_popup__input} rename-notebook-popup`} />
                <button onClick={onRenameNotebook} className={`${commonCss.btn___main} ${commonCss.btn___success}`}>Rename</button>
            </div>
        </div>
    )
}