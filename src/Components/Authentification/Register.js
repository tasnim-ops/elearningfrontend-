import React, { useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio
}
from 'mdb-react-ui-kit';

const Register = () => {

  return (
    <div>
 <MDBContainer fluid>
    <MDBRow className='d-flex justify-content-center align-items-center'>
      <MDBCol lg='8'>
        <MDBCard className='my-5 rounded-3' style={{maxWidth: '600px'}}>
        <MDBCardImage src='https://res.cloudinary.com/ddbiyenrd/image/upload/v1687873429/_x_formation-e-learning_xxnqtp.jpg' className='w-100 rounded-top'  alt="Sample photo"/>
        <MDBCardBody className='px-5'>
        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>

      <MDBRow>
        <MDBCol md='6'>
          <MDBInput wrapperClass='mb-4' label='First name' size='lg' id='form4' type='text'/>
        </MDBCol>

        <MDBCol md='6'>
          <MDBInput wrapperClass='mb-4' label='Last name' size='lg' id='form5' type='text'/>
        </MDBCol>
    </MDBRow>  


    <MDBRow>

          <MDBCol md='6' >
            <MDBInput wrapperClass='mb-4' label='Phone Number' size='lg' id='form5' type='rel'/>
          </MDBCol>


          <MDBCol md='6'>
            <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='Teacher' inline />
            <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='Student' inline />
          </MDBCol>

    </MDBRow>
    <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>

    <MDBRow>
      <MDBCol md='6'>
        <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form4' type='password'/>
      </MDBCol>
      <MDBCol md='6'>
        <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form5' type='password'/>
      </MDBCol>
    </MDBRow>
    <MDBBtn color='success' className='mb-4' size='lg'>Submit</MDBBtn>

</MDBCardBody>
</MDBCard>
</MDBCol >
</MDBRow>
</MDBContainer>
    </div>
  )
}

export default Register;
