import React from 'react';
import {getHotelBySlug} from '../../src/services/hotels.service';
import BookingContainer from '../../src/containers/BookingContainer';

const Hotel = ({hotel}) => {
    return (
        <>
            <BookingContainer hotel={hotel} />
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

export default Hotel;