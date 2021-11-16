import React from 'react';
import {getHotel} from '../../src/utils/hotel-service';
import BookingContainer from '../../src/containers/BookingContainer';

const Hotel = ({hotel}) => {
    return (
        <>
            <BookingContainer hotel={hotel} />
        </>
    );
};


export async function getServerSideProps(ctx) {

    const hotel = getHotel(ctx.params.slug);
    return {
        props: {
            hotel: hotel,
        },
    }

}

export default Hotel;