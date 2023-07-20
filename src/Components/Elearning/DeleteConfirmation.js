import React from 'react'
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../features/categorySlice';
const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, type, message }) => {
const dispatch=useDispatch();
    function handlemodal(type,id){
    confirmModal(type, id);
    dispatch(deleteCategory(id));
}
    return (
    <div>
         <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handlemodal(type,id) }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteConfirmation