import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Typography from '@mui/material/Typography';
const AddCategory = () => {
  return (
    <div  className="container  justify-content-center" >
        <React.Fragment>
    <div>
      <Form  className="border p-4" style={{backgroundColor: '#b9dada'}}>
    <p>
    <Typography  variant="h5" >Add new category </Typography>
    </p>   
        <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="5" >
                <Form.Control type="text"  placeholder="name"/>
            </Form.Group>
                <Form.Group controlId="formFileSm" as={Col} md="5" >
                <Form.Control type="file" accept="image/"  />
            </Form.Group>
        </Row>
        <Button variant="success">Save</Button>
      </Form>
      </div>
      </React.Fragment>
    </div>
  )
};

export default AddCategory;
