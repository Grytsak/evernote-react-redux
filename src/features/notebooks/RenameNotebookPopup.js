import React from "react";

import commonCss from '../../scss/app/Common.module.scss';

export const RenameNotebookPopup = () => {
    return(
        <div className={commonCss.main_popup}>
            <div className={commonCss.main_popup__container}>
                <h3 className={commonCss.main_popup__title}>Rename Notebook</h3>
                <input type='text' className={`${commonCss.main_popup__input} rename-notebook-popup`} />
                <button className={`${commonCss.btn___main} ${commonCss.btn___success}`}>Rename</button>
            </div>
        </div>
    )
}