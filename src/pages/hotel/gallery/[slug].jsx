import React from 'react';
import {getHotelBySlug} from '../../../services/hotels.service';
import GalleryContainer from '../../../containers/GalleryContainer';

const Gallery = ({hotel}) => {
    return (
        <>
            <GalleryContainer hotel={hotel} />
        </>
    );
};


export async function getServerSideProps(ctx) {

    const hotel = await getHotelBySlug(ctx.params.slug);
    return {
        props: {
            hotel: hotel,
        },
    }

}

export default Gallery;