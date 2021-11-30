import React from 'react';
import {getHotelById} from '../../../src/services/hotels.service';
import RoomsManageContainer from '../../../src/containers/RoomsManageContainer';
import {getCookie} from '../../../src/lib/session';

const RoomsManage = ({hotel}) => {
    return (
        <>
            <RoomsManageContainer hotel={hotel} />
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

export default RoomsManage;