import React from 'react'
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const AdminSignin = () => {
  return (
    <div>
<MDBContainer fluid className="p-3 my-5 h-custom border p-3">
<MDBRow>
  <MDBCol col='10' md='6'>
    <img src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1688836520/admin_me4w4l.jpg" className='img-fluid ' alt='admin' />
  </MDBCol>

  <MDBCol col='4' md='6'>
  <form>
    <div className="container border p-3">

      <div className="row mt-2">
        <div className="col-sm-6 mb-2">
          <input className="form-control" type="email" id="email" name="email" placeholder="E-mail" required />
        </div>
        <div className="col-sm-6 mb-2">
          <input className="form-control" type="password" id="password" name="password" placeholder="Password" required />
        </div>
      </div>
      <button className="btn" style={{ backgroundColor: "#2a969c" }}>Login</button>
      <div className="row mt-2">
      <div className="col-sm-6 mb-2">
        <p><h6 >Don't have an account ? <Link to="/admin/register"  >Register</Link></h6></p>
      </div>
      <div className="col-sm-6 mb-2">
        <p><h6 style={{color:'#ff2300'}}>Forgot your password ? <Link href="/admin/register"  >Remember me</Link></h6></p>
      </div>
      </div>
    </div>
  </form>
  </MDBCol>
</MDBRow>

</MDBContainer>
    </div>
  )
}

export default AdminSignin