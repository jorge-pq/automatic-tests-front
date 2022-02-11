import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {getImage} from '../../services/hotels.service';


function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const GalleryContainer = ({ hotel }) => {

    return (
        <ImageList
            sx={{ width: 500, height: 450 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
        >
            {hotel.images?.map((item) => (
                <ImageListItem key={item.path} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(getImage(item.path), 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default GalleryContainer;