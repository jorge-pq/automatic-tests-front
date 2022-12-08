import React from 'react';
import { getHotelById } from '../../../../services/hotels.service';
import GalleryManageContainer from '../../../../containers/GalleryManageContainer';
import { getCookie } from '../../../../lib/session';
import Layout from '../../../../layout';
import { redirectToLogin } from '../../../../utils/util';


const GalleryManage = ({ hotel }) => {
    return (
        <Layout page={'Gestionar imágenes'}>
            <GalleryManageContainer hotel={hotel} />
        </Layout>
    );
};


export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);

    if (!jwt) {
        return redirectToLogin();
    }

    const hotel = await getHotelById(ctx.params.id, jwt);

    return {
        props: {
            hotel: hotel,
        },
    }

}

export default GalleryManage;