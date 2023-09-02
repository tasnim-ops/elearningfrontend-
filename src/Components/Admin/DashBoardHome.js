import React from 'react'
import './DashBoard.css';
import {BsCart3 , BsGrid1X2Fill,BsListCheck, BsFillArchiveFill, BsFillGrid3X3GapFill,BsFillGearFill, BsPeopleFill} from 'react-icons/bs'
import { IoMdTrash } from "react-icons/io";
import { HiPencilSquare } from "react-icons/hi2";
const DashBoardHome = () => {
  return (
    <>
    <main className='main-container'>
        <div className='main-title'>
            <p>DASHBOARD</p>
        </div>
        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <p>CATEGORIES</p>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <p>300</p>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <p>COURSES</p>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h3>15</h3>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <p>TEACHERS</p>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h3>10</h3>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <p>STUDENTS</p>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h3>150</h3>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <p>CONFERENCES</p>
                    <BsListCheck className='card_icon'/>
                </div>
                <h3>150</h3>
            </div>
        </div>
        <div>

        </div>
        <div>
      <h2>Teacher</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Photo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Discription</th>
            <th>Phone</th>
            <th>mail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>
                <IoMdTrash />  <HiPencilSquare />
              </td>
            </tr>
            <tr>
            <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
            <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
            <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
        </tbody>
      </table>
      <div>
      <h2>Students</h2>
      <table className='table'>
        <thead>
          <tr>
            <td>Photo</td>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Discription</th>
            <th>Phone</th>
            <th>mail</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>
                <IoMdTrash />  <HiPencilSquare />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
        </tbody>
      </table>
      </div>
    </div>
    </main>


    </>
  )
}

export default DashBoardHome