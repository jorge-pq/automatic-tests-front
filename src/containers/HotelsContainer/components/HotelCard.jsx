import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {useRouter} from 'next/router';

export default function HotelCard({item}) {

  const router = useRouter();  

  const handleBooking = slug => {
     router.push(`/hotel/${slug}`);
  }  

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={()=>handleBooking(item.slug)}>
        <CardMedia
          component="img"
          height="140"
          image={'https://www.blauhotels.com/cache/63/20/632054992db0d81ab98c4125df16c427.jpg'}
          alt="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=>handleBooking(item.slug)}>
          {'Reservar'}
        </Button>
      </CardActions>
    </Card>
  );
}
