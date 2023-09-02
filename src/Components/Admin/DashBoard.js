import React from 'react'
import {BsJustify, BsSearch, BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle} from 'react-icons/bs';
import './DashBoard.css';
import DashBoardHeader from './DashBoardHeader';
import DashBoardSidebar from './DashBoardSidebar';
import DashBoardHome from './DashBoardHome';

const DashBoard = (props) => {

  return (
<div className='grid-container'>
    <DashBoardHeader/>
    <DashBoardSidebar />
    <DashBoardHome />
</div>
  )
}

  

export default DashBoard