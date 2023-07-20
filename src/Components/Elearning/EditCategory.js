import React, { useEffect, useState } from 'react'
import { Row, Col, Modal, Button } from 'react-bootstrap';
import 'react-phone-input-2/lib/style.css'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch,useSelector } from 'react-redux';
import { deleteCategory, getCategories } from '../../features/categorySlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../style.css'
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation';
export const EditCategory = () => {
  
  //store 
  const {categories,isLoading,error}=useSelector((state)=>state.category)

    const dispatch= useDispatch();
    useEffect(()=>{
      dispatch(getCategories());
    },[dispatch]);
    const navigate=useNavigate();

    //useState of handledelete
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [type, setType] = useState(null);
    const [id, setId] = useState(null);
    
    //useState of handleedit
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handledelete =(id)=>{
      showDeleteModal(id);
    }

    const handeladd=()=>{
      navigate("/addcateg");
    }
      // Handle the displaying of the modal based on  id
    const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage('Are you sure you want to delete the category ?')
    setDisplayConfirmationModal(true);
    
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle the actual deletion of the item
  const submitDelete = ( id) => {
    setDeleteMessage('Category deleted successfully.')
    setDisplayConfirmationModal(false);
  }
    const handleedit=(id)=>{
      
    }
  return (
    <>
  <div className='mb-10' style={{ position: 'absolute', top: '2px', right: '16px' }}>
  <button type="button" style={{color:'#194E6B', 'textDecoration': 'none'}} className="btn btn-info" onClick={handeladd}>new category</button>
  </div>

    <div  style ={{backgroundColor : "#bfeae9" , padding: "20px" , display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Row className="justify-content-center align-items-center mt-60" >
        {categories.map((item)=>(
        <Col key={item.id} sm={12} md={6} lg={3} className="mb-5">
            <Card sx={{ maxWidth: 345, height: 400 , backgroundColor : "#a2d5d3" }}>
                <CardContent  >
                    <Typography gutterBottom variant="h5" component="div">
                    {item.name_categ}
                    </Typography>
                    <CardMedia
                    style={{ width: '100%', height: 300 , backgroundColor : "#e5f7f6" }}
                    component="img"
                    image={item.photo}
                    alt={item.photo}
                    />
                        <EditIcon type='button' onClick={()=> handleedit(item.id)} style={{  position: 'relative','left': '270px'}} />
                        <DeleteIcon type='button' onClick={()=> handledelete(item.id)} />
                </CardContent>
            </Card>
        </Col>
         ))}
    </Row>
    <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type={type} id={id} message={deleteMessage}  />
</div>
    </>
  )
}
export default EditCategory;