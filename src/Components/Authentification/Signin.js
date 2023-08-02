import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
}
from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
const Signin = () => {
  return (
    <div>
 <MDBContainer fluid>


    <MDBRow className='d-flex justify-content-center align-items-center'>
      <MDBCol lg='8'>
        <MDBCard className='my-5 rounded-3 container' style={{maxWidth: '600px'}}>
        <MDBCardImage src='https://res.cloudinary.com/ddbiyenrd/image/upload/v1690499317/login_4x_awp6kt.png' className='w-100 rounded-top'  alt="Sample photo"/>
        <MDBCardBody className='px-5'>
        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2" style={{"text-align":'center' , 'color':'#003b36'}}>Login</h3>
        <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol md='6' className='mb-3'>
            <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='Teacher' inline checked />
            <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='Student' inline />
          </MDBCol>
        </MDBRow>
    <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
    <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>


    <button  style={{'backgroundColor':'#1794bb ', 'color':'#ffffff' }} className='mb-4 ripple ripple-surface ripple-surface-light btn btn-lg mb-4' size='lg'>Login</button>
    <MDBRow>
      <MDBCol md='6'>
        <h6>Don't have an account ? <Link to='/user/register'>Register</Link></h6>      
      </MDBCol>
      <MDBCol md='6'>
        <h6 style={{color:'#ff2300'}}>Forgot your password ? <Link to=''>Refresh</Link></h6>      
      </MDBCol>
    </MDBRow>
</MDBCardBody>
</MDBCard>
</MDBCol >


</MDBRow>


</MDBContainer>
    </div>
  )
}

export default Signin
