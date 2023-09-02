import React from 'react'
import {BsCart3 , BsGrid1X2Fill,BsListCheck, BsFillArchiveFill, BsFillGrid3X3GapFill,BsFillGearFill, BsPeopleFill} from 'react-icons/bs'
import './DashBoard.css';
const DashBoardSidebar = () => {
  return (
    <aside id='sidebar'>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsGrid1X2Fill className='icon_header'/>E-LEARNING
            </div>
            <span className='icon close_icon'>X</span>
        </div>
        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="">
                <BsCart3 className='icon'/>Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                <BsFillGrid3X3GapFill className='icon'/>Categories
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                <BsFillArchiveFill className='icon'/>Courses
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                <BsListCheck className='icon'/>Conferences
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                <BsPeopleFill className='icon'/>Teachers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                <BsPeopleFill className='icon'/>Students
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                <BsFillGearFill className='icon'/>Settings
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default DashBoardSidebar