import React from 'react';
import {getHotelById} from '../../../src/utils/hotel-service';
import RoomsManageContainer from '../../../src/containers/RoomsManageContainer';

const RoomsManage = ({hotel}) => {
    return (
        <>
            <RoomsManageContainer hotel={hotel} />
        </>
    );
};

export async function getServerSideProps(ctx) {

    
    const hotel = getHotelById(ctx.params.id);
   
    return {
        props: {
            hotel: hotel,
        },
    }

}

export default RoomsManage;