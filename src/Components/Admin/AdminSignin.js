import React, { useState } from 'react'
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/authSlice';
import { useEffect } from 'react';

const AdminSignin = () => {
const [role, setRole]=useState('admin');
  const dispatch=useDispatch();
  const navigate = useNavigate('');
  const {user } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isLoggedIn)
    {
    dispatch(reset());
    }
    }, [dispatch, isLoggedIn])

    
  const handleSubmit=(event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append('role',role);
    console.log({
      email: data.get('email'),
      password:data.get('password'),
      role:data.get('role'),
    });
    dispatch(login(data));
  };
  if(isLoggedIn){ 
    localStorage.setItem("CC_Token", JSON.stringify(user.accessToken));
    console.log(localStorage.getItem("CC_Token")) 
    navigate("/admin/dashboard"); 
    }
     

  return (
    <div>
<MDBContainer fluid className="p-3 my-5 h-custom border p-3">
<MDBRow>
  <MDBCol col='10' md='6'>
    <img src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1688836520/admin_me4w4l.jpg" className='img-fluid ' alt='admin' />
  </MDBCol>

  <MDBCol col='4' md='6'>
  <form  onSubmit={handleSubmit} >
    <div className="container border p-3">

      <div className="row mt-2">
        <div className="col-sm-6 mb-2">
          <input className="form-control" type="email" id="email" name="email" placeholder="E-mail" required  autoComplete="email" />
        </div>
        <div className="col-sm-6 mb-2">
          <input className="form-control" type="password" id="password" name="password" placeholder="Password" required autoComplete="current-password"/>
        </div>
      </div>
      <button className="btn" type='submit'  style={{ backgroundColor: "#2a969c" }}>Login</button>
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