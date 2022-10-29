import React from 'react';
import {getHotelBySlug} from '../../../../services/hotels.service';
import GalleryContainer from '../../../../containers/GalleryContainer';
import Layout from '../../../../layout';

const Gallery = ({hotel}) => {
    return (
        <Layout>
            <GalleryContainer hotel={hotel} />
        </Layout>
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