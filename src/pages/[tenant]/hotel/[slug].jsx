import React from 'react';
import dynamic from 'next/dynamic';
import { getHotelBySlug, getRoomTypes, getClients } from '../../../services/hotels.service';
import { getCookie } from '../../../lib/session';
import { redirectToLogin } from '../../../utils/util';
import Layout from '../../../layout';

const BookingContainer = dynamic(() => import('../../../containers/BookingContainer'), {
    suspense: true,
})

const Hotel = ({ hotel, types, clients }) => {
    return (
        <Layout page={hotel.name}>
            <BookingContainer hotel={hotel} roomTypes={types} clients={clients} />
        </Layout>
    );
};


export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);

    if (!jwt) {
        return redirectToLogin();
    }

    const hotel = await getHotelBySlug(ctx.params.slug, jwt);
    const types = await getRoomTypes(jwt);
    const clients = await getClients(jwt);

    return {
        props: {
            hotel: hotel,
            types: types,
            clients: clients
        },
    }

}

export default Hotel;