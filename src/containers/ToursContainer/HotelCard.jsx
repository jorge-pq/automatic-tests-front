import {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {useRouter} from 'next/router';
import {getTenant} from '../../utils/util';
import {getAvailabilities} from '../../services/tours.service';
import Popover from '@mui/material/Popover';

const DEFAULT_IMAGE = 'https://www.blauhotels.com/cache/63/20/632054992db0d81ab98c4125df16c427.jpg';

export default function HotelCard({item}) {

  const router = useRouter();  
  const [list, setList] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = async (event, id) => {
    setAnchorEl(event.currentTarget);
    const data = await getAvailabilities(id);
    setList(data.data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleBooking = slug => {
     router.push(`/${getTenant()}/tour/${slug}`);
  }  

  // const handleGallery = slug => {
  //   router.push(`/${getTenant()}/hotel/gallery/${slug}`);
  // }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={()=>handleBooking(item.slug)}>
        <CardMedia
          component="img"
          height="140"
          image={item.cover || DEFAULT_IMAGE}
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
        <Button size="small" color="primary" onClick={e=>handleClick(e, item._id)}>
          {'Ver disponibilidad'}
        </Button>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
         <ul style={{width: '300px'}}>
            {
              list.map((item, index) =>
                <li key={index}>{`${item.period} --- ${item.persons}/${item.avalaibility}`}</li>
              )
            }
          </ul>
      </Popover>
        <Button size="small" color="primary" disabled>
          {'Galeria'}
        </Button>
      </CardActions>
    </Card>
  );
}
