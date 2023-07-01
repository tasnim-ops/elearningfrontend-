import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Typography from '@mui/material/Typography';
const EditCourse = () => {
  return (
    <div  className="container  justify-content-center" >
    <React.Fragment>
<div>
  <Form  className="border p-4" style={{backgroundColor: '#b9dada'}}>
<p>
<Typography  variant="h5" >Edit course </Typography>
</p>   
        <Form.Group  md="5" className='mb-3'>
            <Form.Control type="text"  placeholder="title" required/>
        </Form.Group>
        <Form.Group  md="5" className='mb-3'>
            <Form.Control type="text"  placeholder="description"/>
        </Form.Group>
    <Row className="mb-3 justify-content-center">
    <div className="d-flex flex-row">
        <Form.Group as={Col} md="3" >
            <Form.Control type="number"  placeholder="Price en DT" required/>
        </Form.Group>
        <Form.Group controlId="formFileSm" as={Col} md="9" >
            <Form.Control type="file" accept="image/"  />
        </Form.Group>
        </div>
    </Row>
    <Row className="mb-3 justify-content-center">
    <div className="d-flex flex-row">
    <Form.Select aria-label="Default select example"  required>
      <option>Category</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    <Form.Select aria-label="Default select example" required>
      <option>Teacher</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    </div>
    </Row>
    <Button variant="success">Save</Button>
  </Form>
  </div>
  </React.Fragment>
</div>
  )
}

export default EditCourse
