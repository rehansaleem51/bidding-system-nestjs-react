import React, { useState } from 'react'
import Sidebar from '../sidebar/sidebar';
import Content from '../content/content';
import './layout.css'



export const layout = () => {
    const [expanded, setExpanded] = useState(false);
    const toggleSidebar = () => {
        setExpanded(!expanded);
    };
    
    return (
        <>
            <main id="main-wrapper" className={`layout${expanded ? ' expanded' : ''}`}>
                <Sidebar/>
                <Content expanded={expanded} toggleSidebar={toggleSidebar}/>
                
            </main>
        </>
  )
}

export default layout;
