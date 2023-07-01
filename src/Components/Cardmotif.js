import React from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


const Cardmotif = (props) => {
    const [expanded, setExpanded] = React.useState(false);

  return (
    <div>
       <Card sx={{ maxWidth: 345 }}>

      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt="Paella dish"
      />
      <CardContent>
      <CardHeader
        title={props.id}
      />
            <Rating name="size-large" defaultValue={2} size="large" />
            <Typography>
            {props.price}
          </Typography>
      </CardContent>
      <CardActions disableSpacing>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>

      </Collapse>
    </Card>
    </div>
  )
}

export default Cardmotif
