import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {getImage} from '../../services/hotels.service';

export default function ImageCard({item}) {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={getImage(item)}
          alt="image"
        />
      </CardActionArea>
      <CardActions>
        <Button size="small" color="error" variant='contained'>
          {'Ocultar'}
        </Button>
      </CardActions>
    </Card>
  );
}
