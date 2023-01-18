import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { styled } from '@mui/material/styles';


function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const ImagePreview = styled('div')(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: '9999',
    background: 'rgb(90, 90, 90)',
    background: 'rgba(60, 60, 60, 0.7)',
    width: '100%',
    textAlign: 'center',
}));


const GalleryContainer = ({ hotel }) => {

    const [path, setPath] = useState('');

    const show = path => {
        setPath(path);
    }

    const close = e => {
        if(e.target.id==='preview'){
            setPath('');
        }
    }

    return (
        <>
            <ImageList
                sx={{ width: 500, height: 450 }}
                variant="quilted"
                cols={4}
                rowHeight={121}
            >
                {hotel.images?.map((item) => (
                    <ImageListItem key={item.path} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                            {...srcset(item.path, 121, item.rows, item.cols)}
                            alt={item.title}
                            loading="lazy"
                            style={{ cursor: 'pointer' }}
                            onClick={() => show(item.path)}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            {
                path &&
                <ImagePreview onClick={close} id='preview'>
                   <img src={path} style={{width: '100vh'}} />
                </ImagePreview>
            }

        </>
    );
};

export default GalleryContainer;