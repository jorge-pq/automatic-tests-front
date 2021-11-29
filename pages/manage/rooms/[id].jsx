import React from 'react';
import {getHotelById} from '../../../src/services/hotels.service';
import RoomsManageContainer from '../../../src/containers/RoomsManageContainer';

const RoomsManage = ({hotel}) => {
    return (
        <>
            <RoomsManageContainer hotel={hotel} />
        </>
    );
};


export async function getServerSideProps(ctx) {

    // let jwt = getCookie("accessToken", ctx.req);

    // if (!jwt) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false,
    //         },
    //     }
    // }

    const hotel = await getHotelById(ctx.params.id);
   
    return {
        props: {
            hotel: hotel,
        },
    }

}

export default RoomsManage;