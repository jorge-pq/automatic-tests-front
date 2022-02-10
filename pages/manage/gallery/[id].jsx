import React from 'react';
import {getHotelById} from '../../../src/services/hotels.service';
import GalleryManageContainer from '../../../src/containers/GalleryManageContainer';
import {getCookie} from '../../../src/lib/session';

const GalleryManage = ({hotel}) => {
    return (
        <>
            <GalleryManageContainer hotel={hotel} />
        </>
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