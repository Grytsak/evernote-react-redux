import React from 'react';
import { Outlet } from 'react-router-dom';

import { Sidebar } from './Sidebar';

export const PageSidebar = () => {
    return(
        <div className="app-container">
            <Sidebar />
            <Outlet />
        </div>
  
    )
}