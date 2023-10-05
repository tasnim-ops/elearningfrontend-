import React, { useEffect, useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import {
  Row,
  Col,
  Modal,
  Button,
  Form,
  Card,
  Image,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createCourse,
  deleteCourse,
  deleteCourseSuccess,
  getCourses,
  updateCourse,
  updateCourseSuccess,
} from "../../features/courseSlice";
import { getTeachers, findTeacherByID } from "../../features/teacherSlice";
import { getCategories } from "../../features/categorySlice";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
const AddCourse = () => {
  const dispatch = useDispatch();
  const { courses, isLoadingCourse, errorCourse, successCourse } = useSelector(
    (state) => state.course
  );
  const { categories, isLoading, error, success } = useSelector(
    (state) => state.category
  );
  const { teachers } = useSelector((state) => state.teacher);

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    dispatch(getCourses());
    dispatch(getCategories());
    dispatch(getTeachers());

    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [dispatch, success]);

  /************************Deletion*******************************/
  const [confDeletion, setConfDeletion] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
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
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [course_course_description, setCourse_course_description] =
    useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [price, setPrice] = useState("");

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
        photo: selectedFile
          ? URL.createObjectURL(selectedFile)
          : editCourse.photo,
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
  const [showAddModal, setShowAddModal] = useState(false);
  const handleClear = () => {
    setDescription("");
    setPrice("");
    setTitle("");
    setTeacher_id("");
    setSelectedFiles([]);
  };
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    handleClear();
  };
  const handleSetShowModal = (id) => setShowAddModal(true, id);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const [teacher_id, setTeacher_id] = useState("");

  const [course_description, setDescription] = useState("");
  const handleAddCourse = (id) => {
    handleSetShowModal(id);
    setCategory_id(id);
  };
  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity()) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("course_description", course_description);
      formData.append("category_id", category_id);
      formData.append("teacher_id", teacher_id);

      // Append each file to the 'documents[]' array
      selectedFiles.forEach((file, index) => {
        formData.append(`documents[${index}]`, file);
      });

      dispatch(createCourse(formData));
    }
  };
  const navigate = useNavigate();
  const handleShowCourse = (courseId) => {
    navigate(`/show-course/${courseId}`); // Use navigate function without .push()
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
    if (successCourse === true) {
      setShowAddSuccessAlert(true);
      setTimeout(() => {
        setShowAddSuccessAlert(false);
      }, 3000);
      handleClear();
    } else if (successCourse === false) {
      setShowAddErrorAlert(true);
      setTimeout(() => {
        setShowAddErrorAlert(false);
      }, 2000); // Show the add error alert for 2 seconds
    }
  }, [successCourse]);

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        mb={2}
        style={{ color: "#2a969c" }}
      >
        Courses handeling
      </Typography>
      {categories.map((categ) => {
        const categoryCourses = courses.filter(
          (course) => course.category_id === categ.id
        );

        if (categoryCourses.length === 0) {
          return null; // Skip rendering the category Box if there are no courses
        }

        return (
          <div key={categ.id}>
            <Box
              className="container-fluid"
              sx={{
                width: "100%",
                height: "50px",
                backgroundColor: "#dcd6cf",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "5px",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#4c9393",
                  opacity: 0.9,
                },
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                {categ.name_categ}
              </Typography>
            </Box>

            <div style={{ backgroundColor: "#bfeae9" }}>
              <div
                className="container"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  type="button"
                  style={{
                    color: "#194E6B",
                    textDecoration: "none",
                    backgroundColor: "#4c9393",
                  }}
                  className="btn"
                  onClick={() => handleAddCourse(categ.id)}
                >
                  new {categ.name_categ} course
                </button>
              </div>
              <div
                className="justify-content-center align-items-center"
                style={{ backgroundColor: "#bfeae9", padding: "20px" }}
              >
                <Row className="justify-content-center align-items-center">
                  {categoryCourses.map((course) => (
                    <Col
                      key={course.id}
                      sm={12}
                      md={10}
                      lg={6}
                      xl={4}
                      className="mb-5"
                      style={{ width: "22rem", height: 700 }}
                    >
                      <div className="card" sx={{ maxWidth: 650, height: 900 }}>
                        <CardContent style={{ height: "80px" }}>
                          <Typography color="text.primary">
                            {course.title}
                          </Typography>
                        </CardContent>
                        <CardContent sx={{ height: "90px" }} className="mt-3">
                          <Typography variant="body2" color="text.secondary">
                            {course.course_description}
                          </Typography>
                        </CardContent>
                        <CardContent>
                          <div
                            style={{
                              height: "250px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                              position: "relative",
                              padding: "2px",
                            }}
                          >
                            <Image
                              src={categ.photo}
                              rounded
                              style={{
                                width: "100%",
                                maxHeight: "100%",
                                objectFit: "cover",
                                position: "relative",
                                top: 0,
                                left: 0,
                              }}
                            />
                          </div>
                        </CardContent>
                        <CardContent sx={{ height: "90px" }} className="mt-3">
                          <Typography variant="body2" color="text.secondary">
                            {course.price} DT
                          </Typography>
                        </CardContent>
                        <CardContent
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <EditIcon
                            type="button"
                            onClick={() => handleEditIconClick(course)}
                          />
                          <Link to={`/show-course/${course.id}`}>Show</Link>
                          <DeleteIcon
                            type="button"
                            onClick={() => handleDelecourse(course.id)}
                          />
                        </CardContent>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
            {showAddSuccessAlert && (
              <Alert variant="success" className="mt-3">
                Added with success
              </Alert>
            )}

            {/* Add course Error Alert */}
            {showAddErrorAlert && (
              <Alert variant="danger" className="mt-3">
                Error! Already exist
              </Alert>
            )}
          </div>
        );
      })}

      {/* Deletion Modal  */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        backdrop="static"
        centered
        keyboard={false}
      >
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
          <Button variant="danger" onClick={handleDeleteConfirmed}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Editing Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editing</Modal.Title>
        </Modal.Header>
        <Form ref={formRef}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exempleForm.ControlInput1">
              <Form.Label>Course name</Form.Label>
              <Form.Control
                type="text"
                required
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Label>Course description</Form.Label>
              <Form.Control
                type="text"
                required
                autoFocus
                value={course_description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Form.Label>Documents</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {selectedFile ? <p>{selectedFile.name}</p> : <p></p>}
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
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="info" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header closeButton onClick={handleCloseAddModal}>
          <Modal.Title>Add new course </Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleAdd}>
          <Modal.Body>
            <Form.Group md="5" className="mb-2">
              <Form.Control
                required
                type="text"
                placeholder="title"
                maxLength="100"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group md="5" className="mb-2">
              <Form.Control
                required
                type="text"
                placeholder="course_description"
                maxLength="200"
                value={course_description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group md="5" className="mb-2">
              <Form.Control
                required
                type="number"
                placeholder="price DT"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Select
              md="5"
              className="mb-2"
              required
              value={category_id}
              onChange={(e) => setCategory_id(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((categ) => {
                if (categ.id === category_id) {
                  return (
                    <option key={categ.id} value={categ.id}>
                      {categ.name_categ}
                    </option>
                  );
                }
                return null;
              })}
            </Form.Select>
            <Form.Select
              md="5"
              className="mb-2"
              value={teacher_id}
              onChange={(e) => setTeacher_id(e.target.value)}
            >
              <option>Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstname} {teacher.lastname}{" "}
                </option>
              ))}
            </Form.Select>
            <Form.Group controlId="formFileSm" md="5">
              <Form.Control
                required
                type="file"
                multiple
                onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
              />
            </Form.Group>

            {/* Add course Success Alert */}
            {showAddSuccessAlert && (
              <Alert variant="success" className="mt-3">
                Added with success
              </Alert>
            )}

            {/* Add course Error Alert */}
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
            <Button type="submit" variant="success">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div className="container  justify-content-center">
        <React.Fragment>
          <div>
            <Form
              className="border p-4"
              style={{ backgroundColor: "#b9dada" }}
              onSubmit={handleAdd}
            >
              <Typography variant="h5">Add new course </Typography>

              <Form.Group md="5" className="mb-3">
                <Form.Control
                  type="text"
                  maxLength="100"
                  placeholder="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group md="5" className="mb-3">
                <Form.Control
                  type="text"
                  maxLength="200"
                  placeholder="course_description"
                  value={course_description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Row className="mb-3 justify-content-center">
                <div className="d-flex flex-row">
                  <Form.Group as={Col} md="3">
                    <Form.Control
                      type="number"
                      placeholder="Price en DT"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFileSm" as={Col} md="9">
                    <Form.Control
                      type="file"
                      multiple
                      onChange={(e) =>
                        setSelectedFiles(Array.from(e.target.files))
                      }
                    />
                  </Form.Group>
                </div>
              </Row>
              <Row className="mb-3 justify-content-center">
                <div className="d-flex flex-row">
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={category_id}
                    onChange={(e) => setCategory_id(e.target.value)}
                  >
                    <option>Category</option>
                    {categories.map((categ) => (
                      <option value={categ.id} key={categ.id}>
                        {categ.name_categ}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={teacher_id}
                    onChange={(e) => setTeacher_id(e.target.value)}
                  >
                    <option>Teacher</option>
                    {teachers.map((teacher) => (
                      <option value={teacher.id} key={teacher.id}>
                        {teacher.firstname} {teacher.lastname}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Row>
              <Button type="submit" variant="success">
                Save
              </Button>
            </Form>
          </div>
        </React.Fragment>
      </div>
    </>
  );
};

export default AddCourse;
