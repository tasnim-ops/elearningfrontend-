import React, { useState } from 'react'
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import AdminSignin from './AdminSignin';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/authSlice'; 
const AdminRegister = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [firstname,setFirstName]=useState("")
  const [lastname,setLastName]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [phone,setPhone]=useState("");

  const {user,isSuccess, isError} =useSelector((state) => state.auth);
  
  const handleSubmit=(event) =>{
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const adminData= {
      email,
      password,
      firstname,
      lastname,
      phone,
    }
    dispatch(register(adminData))
    .unwrap().then(()=>{
      navigate('/admin/login');
    })
    .catch((error)=>{
      //handle any error that occured during registration
      console.log(error);
    })
  
}
  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom border p-3">

      
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1688836520/admin_me4w4l.jpg" className='img-fluid ' alt='admin' />
        </MDBCol>
        <MDBCol col='4' md='6'   >
        <form onSubmit={handleSubmit}>
          <div className="container border p-3">
            <div className="row mt-2">
              <div className="col-sm-6 mb-2">
                <input className="form-control" type="text" id="firstname" name="firstname" placeholder="First name" required autoFocus onChange={(event)=> setFirstName(event.target.value)} />
              </div>
              <div className="col-sm-6 mb-2">
                <input className="form-control" type="text" id="lastname" name="lastname" placeholder="Last name" required  onChange={(event)=> setLastName(event.target.value)} />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-6 mb-2">
                <input className="form-control" type="email" id="email" name="email" placeholder="E-mail" required onChange={(event)=> setEmail(event.target.value)} />
              </div>
              <div className="col-sm-6 mb-2">
                <input className="form-control" type="password" id="password" name="password" placeholder="Password" required onChange={(event)=> setPassword(event.target.value)} />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-6">
                <input className="form-control" type="tel" id="phone" name="phone" placeholder="+216" required onChange={(event)=> setPhone(event.target.value)}  />
              </div>
            </div>
            <button className="btn" type='submit' style={{ backgroundColor: "#2a969c" }}>Submit</button>
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
          </form>
        </MDBCol>
      </MDBRow>

      </MDBContainer>
    </>
  )
}

export default AdminRegister