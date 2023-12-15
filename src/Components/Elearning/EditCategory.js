import React, { useEffect, useState, useRef } from "react";
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
import {
  getCategories,
  updateCategory,
  deleteCategory,
  createCategory,
  deleteCategorySuccess,
  updateCategorySuccess,
} from "../../features/categorySlice";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const EditCategory = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error, success } = useSelector(
    (state) => state.category
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  //console.log("teacher logged In", isLoggedIn);
  useEffect(() => {
    document.body.style.backgroundColor = "#bfeae9";
    dispatch(getCategories());
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [dispatch, success]);
  /************************Deletion*******************************/
  const [confDeletion, setConfDeletion] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);

  const çhandleShowDeleteModal = (id) => {
    setSelectedCategoryId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDelecategory = (id) => {
    setConfDeletion(false);
    setSelectedCategoryId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteCategory(selectedCategoryId));
    setShowDeleteSuccessAlert(true);
    setTimeout(() => {
      setShowDeleteSuccessAlert(false);
      handleCloseDeleteModal();
      dispatch(deleteCategorySuccess());
      dispatch(getCategories()); // Rafraîchir la liste après la suppression
    }, 2000);
  };

  /************************Editing*******************************/
  const [name_categ, setName_categ] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);
  const [showEditErrorAlert, setShowEditErrorAlert] = useState(false);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const formRef = useRef(null);

  // Function to handle edit icon click
  const handleEditIconClick = (item) => {
    if (item.id !== undefined) {
      setEditCategory(item);
      setName_categ(item.name_categ);
      setSelectedFile(null);
      handleShowEditModal();
    } else {
      //console.error("Category ID is undefined.");
    }
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle form submission for editing
  const handleSaveChanges = () => {
    //console.log("Attempting to save changes...");

    const form = formRef.current;
    //console.log("categorie à modifier", editCategory.id);
    if (form && form.checkValidity() && editCategory && editCategory.id) {
      const updatedCategory = {
        id: editCategory.id, // Ensure editCategory has a valid id
        name_categ: name_categ,
        photo: selectedFile
          ? URL.createObjectURL(selectedFile)
          : editCategory.photo,
      };
      //console.log("Updating category:", updatedCategory);

      dispatch(updateCategory(updatedCategory)).then((res) => {
        //onsole.log("Update response:", res);
        if (res && res.payload) {
          if (!res.payload.error) {
            setName_categ("");
            setSelectedFile(null);
            handleCloseEditModal();
            dispatch(updateCategorySuccess());
          } else {
            //console.error("Error updating category:", res.payload.error);
            // Vous pouvez gérer l'erreur ici, par exemple en affichant une alerte d'erreur.
          }
        }
      });
    } else {
      //console.error("Invalid data or category ID is undefined.");
    }
  };

  /************************Adding*******************************/

  const [validated, setValidated] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleSetShowModal = () => setShowAddModal(true);
  const [photo, setPhoto] = useState(null);
  const handleAddCategory = () => {
    handleSetShowModal();
  };
  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log("Attempting to add new category...");

    const form = event.currentTarget;
    setValidated(true);

    if (form.checkValidity()) {
      const formData = new FormData();
      formData.append("name_categ", name_categ);
      formData.append("photo", photo);

      //console.log("New category data:", formData);

      dispatch(createCategory(formData));
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
            onClick={() => handleAddCategory()}
          >
            new category
          </button>
        </div>
        <div
          className="justify-content-center align-items-center"
          style={{ backgroundColor: "#bfeae9", padding: "20px" }}
        >
          <Row className="justify-content-center align-items-center">
            {categories.map((item) => (
              <Col
                key={item.id}
                sm={12}
                md={10}
                lg={6}
                xl={4}
                className="mb-5"
                style={{ width: "18rem" }}
              >
                <Card>
                  <CardContent>
                    <Card.Title
                      style={{ textAlign: "center", color: "#ff5722" }}
                    >
                      {item.name_categ}
                    </Card.Title>
                  </CardContent>
                  <div
                    style={{
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      position: "relative",
                      padding: "2px",
                    }}
                  >
                    <Image
                      src={item.photo}
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
                  <CardContent>
                    <EditIcon
                      type="button"
                      onClick={() => handleEditIconClick(item)}
                      style={{ position: "relative", left: "80%" }}
                    />
                    <DeleteIcon
                      type="button"
                      onClick={() => handleDelecategory(item.id)}
                    />
                  </CardContent>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
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
          Are you sure you want to delete this category? Doing so will result in
          the deletion of all corresponding courses under the category{" "}
          {name_categ}
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
              <Form.Label>Category name</Form.Label>
              <Form.Control
                type="text"
                required
                autoFocus
                value={name_categ}
                onChange={(e) => setName_categ(e.target.value)}
              />
              <Form.Label>Photo</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt={selectedFile.name}
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <img
                  src={editCategory && editCategory.photo}
                  alt={editCategory && editCategory.name_categ}
                  style={{ width: "100%", height: "auto" }}
                />
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
        <Modal.Header closeButton>
          <Modal.Title>Add new category </Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleAdd}>
          <Modal.Body>
            <Form.Group md="5">
              <Form.Control
                required
                type="text"
                placeholder="name"
                value={name_categ}
                onChange={(e) => setName_categ(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFileSm" md="5">
              <Form.Control
                required
                type="file"
                onChange={(e) => {
                  //console.log("Selected file:", e.target.files[0]);
                  setPhoto(e.target.files[0]);
                }}
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
            <Button type="submit" variant="success">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default EditCategory;
