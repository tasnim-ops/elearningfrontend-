import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../features/categorySlice';
import axios from 'axios';

const AddCategory = () => {
  const [validated, setValidated] = useState(false);
  const [categname, setCategname] = useState('');
  const [categimage, setCategimage] = useState('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(createCategory);
  }, [dispatch]);

  const handleAjout = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      const category = {
        categname: categname,
        categimage: categimage
      };

      axios
        .post('http://127.0.0.1:8000/api/categ/', category, {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
          }
        })
        .then((response) => {
          // Handle the response
          console.log('Category created:', response.data);
          setCategname('');
          setCategimage('');
          setValidated(false);
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error creating category:', error);
          alert('Error! Could not insert category.');
        });
    }

    setValidated(true);
  };

  return (
    <div className="container justify-content-center">
      <React.Fragment>
        <div>
          <Form className="border p-4" style={{ backgroundColor: '#b9dada' }} noValidate validated={validated} onSubmit={handleAjout}>
            <Typography variant="h5">Add new category</Typography>
            <Row className="mb-3 justify-content-center">
              <Form.Group as={Col} md="5">
                <Form.Control required type="text" placeholder="name" value={categname} onChange={(e) => setCategname(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formFileSm" as={Col} md="5">
                <Form.Control required type="file" accept="image/" onChange={(e) => setCategimage(e.target.files[0])} />
              </Form.Group>
            </Row>
            <Button type="submit" variant="success">Save</Button>
          </Form>
        </div>
      </React.Fragment>
    </div>
  );
};

export default AddCategory;
