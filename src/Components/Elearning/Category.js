import React from 'react'
import 'react-phone-input-2/lib/style.css'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import data from '../../assests/data/data';
import Cardmotif from '../Cardmotif';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Container, Row, Col } from 'react-bootstrap';

import Stack from '@mui/material/Stack';
const Category = () => {
  const {  product } = data;
  return (
    <div>
      <div>
  <Row className="justify-content-center align-items-center" >
    {product.map((item)=>(
      <Col key={item.id} sm={12} md={6} lg={3} className="mb-5">
        <Card sx={{ maxWidth: 345, height: 400 }}>
          <CardMedia image={item.image}  sx={{ height: 200 }}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
              </Typography>
            <Typography variant="body2" color="text.secondary">
                  {item.price} $
                </Typography>
          </CardContent>
        </Card>
      </Col>
    ))}
  </Row>
</div>
    </div>
  )
}

export default Category
