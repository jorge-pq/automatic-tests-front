import React from 'react';
import {getHotelBySlug} from '../../../../services/hotels.service';
import GalleryContainer from '../../../../containers/GalleryContainer';
import Layout from '../../../../layout';
import { redirectToLogin } from '../../../../utils/util';
import {getCookie} from '../../../../lib/session';

const Gallery = ({hotel}) => {
    return (
        <Layout  page={'Galería'}>
            <GalleryContainer hotel={hotel} />
        </Layout>
    );
};


export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);

    if (!jwt) {
        return redirectToLogin();
    }

    const hotel = await getHotelBySlug(ctx.params.slug, jwt);
    return {
        props: {
            hotel: hotel,
        },
    }

}

export default Gallery;