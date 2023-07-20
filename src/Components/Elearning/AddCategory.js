import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Typography from '@mui/material/Typography';
import { createCategory } from '../../features/categorySlice';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
const AddCategory = () => {
  const navigate=useNavigate();
  const [validated, setValidated] = useState(false);
  const [name_categ, setName_categ] = useState('');
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity()) {
      const formData = new FormData();
      formData.append('name_categ', name_categ);
      formData.append('photo', photo);

      dispatch(createCategory(formData))
        .then((res) => {
          console.log('insert OK', res);
          setName_categ('');
          setPhoto(null);
          return(
            <Alert  variant='success'>
            Added with success
          </Alert>
          )
          navigate("/categ")
        })
        .catch((error) => {
          console.log(error.response);
          alert('Error! Cannot connect');
        });
    }

    setValidated(true);
  };

  return (
    <div className="container justify-content-center">
      <React.Fragment>
        <div>
          <Form
            className="border p-4"
            style={{ backgroundColor: '#b9dada' }}
            noValidate
            validated={validated}
            onSubmit={handleAdd}
          >
            <Typography variant="h5">Add new category</Typography>
            <Row className="mb-3 justify-content-center">
              <Form.Group as={Col} md="5">
                <Form.Control
                  required
                  type="text"
                  placeholder="name"
                  value={name_categ}
                  onChange={(e) => setName_categ(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formFileSm" as={Col} md="5">
                <Form.Control
                  required
                  type="file"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </Form.Group>
            </Row>
            <Button type="submit" variant="success">
              Save
            </Button>
          </Form>
        </div>
      </React.Fragment>
    </div>
  );
};

export default AddCategory;
