import React from 'react'
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import AdminSignin from './AdminSignin';
const AdminRegister = () => {

  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom border p-3">

      
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1688836520/admin_me4w4l.jpg" className='img-fluid ' alt='admin' />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <div className="container border p-3">
            <div className="row mt-2">
              <div className="col-sm-6 mb-2">
                <input className="form-control" type="text" id="firstname" name="firstname" placeholder="First name" required />
              </div>
              <div className="col-sm-6 mb-2">
                <input className="form-control" type="text" id="lastname" name="lastname" placeholder="Last name" required />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-6 mb-2">
                <input className="form-control" type="email" id="email" name="email" placeholder="E-mail" required />
              </div>
              <div className="col-sm-6 mb-2">
                <input className="form-control" type="password" id="password" name="password" placeholder="Password" required />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-6">
                <input className="form-control" type="tel" id="phone" name="phone" placeholder="+216" required />
              </div>
            </div>
            <button className="btn" style={{ backgroundColor: "#2a969c" }}>Submit</button>
            <div className='row mt-2'>
              <div className="col-sm-6 mb-2">
              <p>
                <h6>
                  Already have an account? <Link to="/admin/login">Sign in</Link>
                </h6>
              </p>
              </div>
            </div>
          </div>
        </MDBCol>
      </MDBRow>

      </MDBContainer>
    </>
  )
}

export default AdminRegister