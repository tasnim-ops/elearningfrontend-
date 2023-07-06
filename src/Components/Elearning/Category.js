import React,{useEffect} from 'react'
import 'react-phone-input-2/lib/style.css'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import data from '../../assests/data/data';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { getCategories } from '../../features/categorySlice';
import { Padding } from '@mui/icons-material';
const Category = () => {
  const dispatch= useDispatch();
  const {categories,isLoading,error}=useSelector((state)=>state.category)
  useEffect(()=>{
    dispatch(getCategories());
  },[dispatch]);
  return (
   
   
   <>
      <div  style ={{backgroundColor : "#bfeae9" , padding: "20px" , display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Row className="justify-content-center align-items-center" >
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
