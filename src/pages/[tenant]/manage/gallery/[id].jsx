import React from 'react';
import {getHotelById} from '../../../../services/hotels.service';
import GalleryManageContainer from '../../../../containers/GalleryManageContainer';
import {getCookie} from '../../../../lib/session';
import Layout from '../../../../layout';

const GalleryManage = ({hotel}) => {
    return (
        <Layout>
            <GalleryManageContainer hotel={hotel} />
        </Layout>
    );
};


export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);

    if (!jwt) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const hotel = await getHotelById(ctx.params.id);
   
    return {
        props: {
            hotel: hotel,
        },
    }

}

export default GalleryManage;