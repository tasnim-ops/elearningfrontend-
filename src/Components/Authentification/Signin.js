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
}
from 'mdb-react-ui-kit';
const Signin = () => {
  return (
    <div>
 <MDBContainer fluid>
    <MDBRow className='d-flex justify-content-center align-items-center'>
      <MDBCol lg='8'>
        <MDBCard className='my-5 rounded-3' style={{maxWidth: '600px'}}>
        <MDBCardImage src='https://res.cloudinary.com/ddbiyenrd/image/upload/v1687873429/_x_formation-e-learning_xxnqtp.jpg' className='w-100 rounded-top'  alt="Sample photo"/>
        <MDBCardBody className='px-5'>
        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login</h3>





    <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
    <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>


    <MDBBtn color='success' className='mb-4' size='lg'>Login</MDBBtn>

</MDBCardBody>
</MDBCard>
</MDBCol >
</MDBRow>
</MDBContainer>
    </div>
  )
}

export default Signin
