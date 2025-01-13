import React from 'react'
import { Button } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { Outlet } from 'react-router-dom';
import './content.css'
import Spinner from '../spinner/spinner';

export const content = ({ expanded, toggleSidebar }) => {

  return (
    
    <div className="content">
        <Button className="toggle-button" onClick={toggleSidebar} variant="success">
            {expanded ? <ChevronRight /> : <ChevronLeft />}
        </Button>
        <Spinner />
        <Outlet />
    </div>
  )
}

export default content;
