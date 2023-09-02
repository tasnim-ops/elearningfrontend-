import React from 'react'
import {BsJustify, BsSearch, BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle} from 'react-icons/bs';
import './DashBoard.css';
const DashBoardHeader = () => {
  return (
    <header className='header'>
    <div className='menu-icon'>
      <BsJustify className='icon'/>
    </div>
    <div className='header-left'>
      <BsSearch className='icon'/>
    </div>
    <div className='header-right'>
      <BsFillBellFill className='icon'/>
      <BsFillEnvelopeFill className='icon'/>
      <BsPersonCircle className='icon'/>

    </div>
  </header>
  )
}

export default DashBoardHeader