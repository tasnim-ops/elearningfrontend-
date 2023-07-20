import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, updateCategory, deleteCategory } from '../../features/categorySlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


export const EditCategory = () => {
  
  const { categories, isLoading, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for the modals
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  // State for the category data to be edited
  const [editCategory, setEditCategory] = useState(null);

  // State for the input fields
  const [name_categ, setName_categ] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Ref for the form
  const formRef = useRef(null);

  // Load categories on component mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Function to handle edit icon click
  const handleEditIconClick = (item) => {
    if (item.id !== undefined) { // Check if the category ID is defined
      setEditCategory(item);
      setName_categ(item.name_categ);
      setSelectedFile(null); // Reset the selectedFile state when opening the modal
      handleShowEditModal();
    } else {
      console.error("Category ID is undefined.");
    }
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle form submission for editing
  const handleSaveChanges = () => {
    const form = formRef.current;
    if (form && form.checkValidity() && editCategory && editCategory.id) { // Check if editCategory and its ID are defined
      // Prepare the category data to update
      const category = {
        id: editCategory.id,
        name_categ: name_categ,
        photo: selectedFile ? URL.createObjectURL(selectedFile) : editCategory.photo,
      };
      dispatch(updateCategory(category)).then((res) => {
        console.log("modified successfully", res);
        // Clear the input fields
        setName_categ("");
        setSelectedFile(null);
        // Close the modal
        handleCloseEditModal();
      });
    } else {
      console.error("Invalid data or category ID is undefined.");
    }
  };

  // Function to handle form submission for deletion
  const handleDeleteItem = () => {
    if (editCategory && editCategory.id) { // Check if editCategory and its ID are defined
      dispatch(deleteCategory(editCategory.id)).then(() => {
        console.log("deleted successfully");
        // Close the modal
        handleCloseDeleteModal();
      });
    } else {
      console.error("Category ID is undefined.");
    }
  };

  return (
    <>
<div className='mb-10' style={{ position: 'absolute', top: '2px', right: '16px' }}>
        <button type="button" style={{ color: '#194E6B', textDecoration: 'none' }} className="btn btn-info" onClick={() => navigate("/addcateg")}>new category</button>
      </div>

      <div style={{ backgroundColor: "#bfeae9", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Row className="justify-content-center align-items-center mt-60">
          {categories.map((item) => (
            <Col key={item.id} sm={12} md={6} lg={3} className="mb-5">
              <Card sx={{ maxWidth: 345, height: 400, backgroundColor: "#a2d5d3" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name_categ}
                  </Typography>
                  <CardMedia
                    style={{ width: '100%', height: 300, backgroundColor: "#e5f7f6" }}
                    component="img"
                    image={item.photo}
                    alt={item.photo}
                  />
                  <EditIcon type='button' onClick={() => handleEditIconClick(item)} style={{ position: 'relative', left: '270px' }} />
                  <DeleteIcon type='button' onClick={() => handleShowDeleteModal()} />
                </CardContent>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Modal for Editing */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef}>
            <Form.Group className='mb-3' controlId='exempleForm.ControlInput1'>
              <Form.Label>Category name</Form.Label>
              <Form.Control type="text" required autoFocus value={name_categ} onChange={(e) => setName_categ(e.target.value)} />
              <Form.Label>Photo</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {selectedFile ? (
                <img src={URL.createObjectURL(selectedFile)} alt={selectedFile.name} style={{ width: "100%", height: "auto" }} />
              ) : (
                <img src={editCategory && editCategory.photo} alt={editCategory && editCategory.name_categ} style={{ width: "100%", height: "auto" }} />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseEditModal}>Close</Button>
          <Button variant='info' onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Deletion */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Contenu du modal de suppression */}
          {/* Par exemple, vous pouvez afficher ici un message de confirmation */}
          Êtes-vous sûr de vouloir supprimer cet élément ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseDeleteModal}>Annuler</Button>
          <Button variant='danger' onClick={handleDeleteItem}>Supprimer</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default EditCategory;