import React,{useEffect} from 'react'
import 'react-phone-input-2/lib/style.css'
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { getCategories } from '../../features/categorySlice';
import { CardContent } from '@mui/material';
import Button from 'react-bootstrap/Button';
const Category = () => {
  const dispatch= useDispatch();
  const {categories,isLoading,error}=useSelector((state)=>state.category)
  useEffect(()=>{
    dispatch(getCategories());
  },[dispatch]);
  return (
   
   
   <>
      <div  className="justify-content-center align-items-center" style={{ backgroundColor: '#bfeae9', padding: '20px' }}>
        <Row className="justify-content-center align-items-center">
          {categories.map((item) => (
            <Col  key={item.id} sm={12} md={10} lg={6} xl={4} className="mb-5"  style={{ width: '18rem' }}>
              <Card  >
              <CardContent  >
                  <Card.Title style={{ textAlign: 'center' ,color:'#ff5722'}}>{item.name_categ}</Card.Title>
                </CardContent>
                {/* Image container with fixed height */}
                <div  style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' ,  'padding':'2px' }}>
                  <Image src={item.photo} rounded style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' , position: 'relative', top: 0, left: 0}} />
                </div>
                <CardContent  style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" style={{ backgroundColor: '#ff5722', color: 'white' }}>Show courses</Button>
                </CardContent>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

export default Category
