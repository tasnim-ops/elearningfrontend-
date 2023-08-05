import React , { useEffect, useState, useRef } from 'react'
import Typography from '@mui/material/Typography';
import { Row, Col, Modal, Button ,Form, Card,Image,Alert} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createCourse, deleteCourse, deleteCourseSuccess, getCourses, updateCourse, updateCourseSuccess } from '../../features/courseSlice';
import { getCategories } from '../../features/categorySlice';
import Box from '@mui/material/Box';
const AddCourse = () => {

  const dispatch = useDispatch();
  const { courses, isLoadingCourse, errorCourse ,successCourse} = useSelector((state) => state.course);
  const { categories, isLoading, error ,success} = useSelector((state) => state.category);
  useEffect(() => {
    document.body.style.backgroundColor = "#bfeae9"; 
    dispatch(getCourses());
    dispatch(getCategories());

    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [dispatch, success]);

                  /************************Deletion*******************************/
                  const [confDeletion, setConfDeletion] = useState(false);
                  const [showDeleteModal, setShowDeleteModal] = useState(false);
                  const [selectedCourseId, setSelectedCourseId] = useState(null);
                  const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);

                  const handleShowDeleteModal = (id) => {
                    setSelectedCourseId(id);
                    setShowDeleteModal(true);
                  };
        
                  const handleCloseDeleteModal = () => setShowDeleteModal(false);
                  const handleDelecourse = (id) => {
                    setConfDeletion(false);
                    setSelectedCourseId(id);
                    setShowDeleteModal(true);
                  };

                       
                  const handleDeleteConfirmed = () => {
                    dispatch(deleteCourse(selectedCourseId));
                    setShowDeleteSuccessAlert(true);
                    setTimeout(() => {
                      setShowDeleteSuccessAlert(false);
                      handleCloseDeleteModal();
                      dispatch(deleteCourseSuccess());
                      dispatch(getCourses()); // Rafraîchir la liste après la suppression
                    }, 2000);
                  };
         
                /************************Editing*******************************/
                const [title, setTitle] = useState('');
                const [selectedFile, setSelectedFile] = useState(null);
                const [course_description, setCourse_description] = useState(null);
                const [showEditModal, setShowEditModal] = useState(false);
                const [price, setPrice] = useState(null);

                const [editCourse, setEditCourse] = useState(null);

                const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);
                const [showEditErrorAlert, setShowEditErrorAlert] = useState(false);
              
                const handleCloseEditModal = () => setShowEditModal(false);
                const handleShowEditModal = () => setShowEditModal(true);
              
                const formRef = useRef(null);


                // Function to handle edit icon click
                const handleEditIconClick = (item) => {
                  if (item.id !== undefined) {
                    setEditCourse(item);
                    setTitle(item.title);
                    setSelectedFile(null);
                    handleShowEditModal();
                  } else {
                    console.error("Course ID is undefined.");
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
                  if (form && form.checkValidity() && editCourse && editCourse.id) {
                    const Course = {
                      id: editCourse.id,
                      title: title,
                      photo: selectedFile ? URL.createObjectURL(selectedFile) : editCourse.photo,
                    };
                    dispatch(updateCourse(Course)).then((res) => {
                      console.log("modified successfully", res);
                      setTitle("");
                      setSelectedFile(null);
                      handleCloseEditModal();
                      dispatch(updateCourseSuccess());
                    });
                  } else {
                    console.error("Invalid data or course ID is undefined.");
                  }
                };


                /************************Adding*******************************/

                const [validated, setValidated] = useState(false);
                const [showAddModal, setShowAddModal]=useState(false);
                const handleCloseAddModal = () => setShowAddModal(false);
                const handleSetShowModal=()=>setShowAddModal(true);
                const [documents, setDocuments] = useState(null);

                const handleAddCourse =()=>{
                  handleSetShowModal();
                }
                const handleAdd = (event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  const form = event.currentTarget;
                  setValidated(true);

                  if (form.checkValidity()) {
                    const formData = new FormData();
                    formData.append('title', title);
                    formData.append('documents', documents);

                    dispatch(createCourse(formData));
                  }
                };
                const [showAddSuccessAlert, setShowAddSuccessAlert] = useState(false);
                const [showAddErrorAlert, setShowAddErrorAlert] = useState(false);
                const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);
                
                useEffect(() => {
                  if (success === true) {
                    setShowEditSuccessAlert(true);
                    setTimeout(() => {
                      setShowEditSuccessAlert(false);
                    }, 2000);
                  } else if (success === false) {
                    setShowEditErrorAlert(true);
                    setTimeout(() => {
                      setShowEditErrorAlert(false);
                    }, 2000);
                  }
                }, [success]);
                
                useEffect(() => {
                  if (success === true) {
                    setShowDeleteSuccessAlert(true);
                    setTimeout(() => {
                      setShowDeleteSuccessAlert(false);
                    }, 2000);
                  } else if (success === false) {
                    setShowDeleteErrorAlert(true);
                    setTimeout(() => {
                      setShowDeleteErrorAlert(false);
                    }, 2000);
                  }
                }, [success]);
                useEffect(() => {
                  if (success === true) {
                    setShowAddSuccessAlert(true);
                    setTimeout(() => {
                      setShowAddSuccessAlert(false);
                    }, 2000); // Show the add success alert for 2 seconds
                  } else if (success === false) {
                    setShowAddErrorAlert(true);
                    setTimeout(() => {
                      setShowAddErrorAlert(false);
                    }, 2000); // Show the add error alert for 2 seconds
                  }
                }, [success]);
              
  return (

<>  
{categories.map((categ) => {
  const categoryCourses = courses.filter((course) => course.category_id === categ.id);

  if (categoryCourses.length === 0) {
    return null; // Skip rendering the category Box if there are no courses
  }

  return (
    <div key={categ.id}>
      <Box
        className='container-fluid'
        sx={{
          width: 300,
          height: 100,
          backgroundColor: '#7df9ff',
          '&:hover': {
            backgroundColor: 'info.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        {categ.name_categ}
      </Box>
      <div style={{ backgroundColor: "#bfeae9" }}>
        <div className='container' style={{'display': 'flex', 'justifyContent':'flex-end' }}>
          <button type="button" style={{ color: '#194E6B', textDecoration: 'none', 'backgroundColor':'#4c9393'}} className="btn" onClick={() => handleAddCourse()}>new course</button>
        </div>
        <div className="justify-content-center align-items-center" style={{ backgroundColor: '#bfeae9', padding: '20px' }}>
          <Row className="justify-content-center align-items-center">
            {categoryCourses.map((course) => (
              <Col key={course.id} sm={12} md={10} lg={6} xl={4} className="mb-5"  style={{ width: '18rem' }}>
                <Card >
                  <CardContent>
                    <Card.Title style={{ textAlign: 'center' ,color:'#ff5722'}}>{course.title}</Card.Title>
                  </CardContent>          
                  <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', 'padding':'2px' }}>
                    <Image src={categ.photo} rounded style={{ width: '100%', maxHeight: '100%', objectFit: 'cover', position: 'relative', top: 0, left: 0 }} />
                  </div>
                  <CardContent>
                    <EditIcon type='button' onClick={() => handleEditIconClick(course)} style={{ position: 'relative', left: '80%' }} />
                    <DeleteIcon type='button' onClick={() => handleDelecourse(course.id)} />
                  </CardContent>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
})}

   {/* Deletion Modal  */}
   <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} backdrop='static' centered keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title> Warning !!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            You are going to delete a category, are you sure?
            {showDeleteSuccessAlert && (
          <Alert variant="success" className="mt-3">
            Deleted successfully
          </Alert>
        )}
        {showDeleteErrorAlert && (
          <Alert variant="danger" className="mt-3">
            Error! Cann not delete
          </Alert>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleDeleteConfirmed}>Delete</Button>
          <Button variant='secondary' onClick={handleCloseDeleteModal}>Cancel</Button>
        </Modal.Footer>

      </Modal>

{/* Editing Modal */}
<Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editing</Modal.Title>
        </Modal.Header>
        <Form ref={formRef}>
        <Modal.Body>
            <Form.Group className='mb-3' controlId='exempleForm.ControlInput1'>
              <Form.Label>Course name</Form.Label>
              <Form.Control type="text" required autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />
              <Form.Label>Documents</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {selectedFile ? (
                <img src={URL.createObjectURL(selectedFile)} alt={selectedFile.name} style={{ width: "100%", height: "auto" }} />
              ) : (
                <img src={editCourse && editCourse.photo} alt={editCourse && editCourse.title} style={{ width: "100%", height: "auto" }} />
              )}
            </Form.Group>
            {showEditSuccessAlert && (
            <Alert variant="success" className="mt-3">
              Modified successfully
            </Alert>
          )}

          {/* Edit Category Error Alert */}
          {showEditErrorAlert && (
            <Alert variant="danger" className="mt-3">
              Error! Could not modify category
            </Alert>
          )}
          </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseEditModal}>Close</Button>
          <Button variant='info' onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
        </Form>

      </Modal>

        {/* Add Modal */}
        <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add new course </Modal.Title>
            </Modal.Header>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleAdd}
            >
            <Modal.Body>
              <Form.Group  md="5">
                <Form.Control
                  required
                  type="text"
                  placeholder="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formFileSm" md="5">
                <Form.Control
                  required
                  type="file"
                  onChange={(e) => setDocuments(e.target.files[0])}
                />
              </Form.Group>
        {/* Add Category Success Alert */}
        {showAddSuccessAlert && (
          <Alert variant="success" className="mt-3">
            Added with success
          </Alert>
        )}

        {/* Add Category Error Alert */}
        {showAddErrorAlert && (
          <Alert variant="danger" className="mt-3">
            Error! Already exist
          </Alert>
        )}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="warning" onClick={handleCloseAddModal}>
              Cancle
            </Button>
            <Button type="submit" variant="success" >
              Save
            </Button>

            </Modal.Footer>
            </Form>

          </Modal>





    <div  className="container  justify-content-center" >
    <React.Fragment>
<div>
  <Form  className="border p-4" style={{backgroundColor: '#b9dada'}}>
<p>
<Typography  variant="h5" >Add new course </Typography>
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
</>  
  )
}

export default AddCourse
