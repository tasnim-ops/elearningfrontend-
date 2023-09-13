import React from 'react'
import {BsGrid1X2Fill, BsFillGrid3X3GapFill,BsFillGearFill, BsPeopleFill} from 'react-icons/bs'
import './DashBoard.css';
import { useState } from 'react';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DuoIcon from '@mui/icons-material/Duo';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
const DashBoardSidebar = () => {
    const [isOpen,setIsOpen]=useState(false);
    const toggle = () => setIsOpen(!isOpen); 
    

     return (
    <aside id="sidebar" className={isOpen ? '' : 'collapsed'} style={{ width: isOpen ? "165px" : "50px" }}>
      <div className='sidebar-brand'>
        <BsGrid1X2Fill onClick={toggle} className='icon_header' style={{ marginLeft: isOpen ? "50px" : "10px" }} />
      </div>
      {/*
      <div className={`sidebar-title ${isOpen ? '' : 'collapsed'}`}>
        E-LEARNING
        <span className='icon close_icon' onClick={toggle}>
          X
        </span>
      </div>
      */}
      <ul className='sidebar-list'>
        <li className={`sidebar-list-item ${isOpen ? '' : 'collapsed'}`}>
          <a href="#categories">
            <BsFillGrid3X3GapFill className='icon' />
            <div>Categories</div>
          </a>
        </li>
        <li className={`sidebar-list-item ${isOpen ? '' : 'collapsed'}`}>
          <a href="#course">
            <ImportContactsIcon className='icon' />
            <div>Courses</div>
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#conference">
            <DuoIcon className='icon' />
            <div>Conferences</div>
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href='#teacher'>
            <BsPeopleFill className='icon' />
            <div>Teachers</div>
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="#student">
            <SchoolIcon className='icon' />
            <div>Students</div>
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsFillGearFill className='icon' />
            <div>Settings</div>
          </a>
        </li>
      </ul>
    </aside>
  )
}

export default DashBoardSidebar