import React from 'react';
import dynamic from 'next/dynamic';
import { getRoomTypes, getClients } from '../../../services/hotels.service';
import { getTourBySlug } from '../../../services/tours.service';
import { getCookie } from '../../../lib/session';
import { redirectToLogin } from '../../../utils/util';
import Layout from '../../../layout';

const BookingTourContainer = dynamic(() => import('../../../containers/BookingTourContainer'), {
    suspense: true,
})

const Tour = ({ tour, types, clients }) => {
    return (
        <Layout page={tour.name}>
            <BookingTourContainer tour={tour} roomTypes={types} clients={clients} />
        </Layout>
    );
};


export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);

    if (!jwt) {
        return redirectToLogin();
    }

    const tour = await getTourBySlug(ctx.params.slug, jwt);
    const types = await getRoomTypes(jwt);
    const clients = await getClients(jwt, 1);

    return {
        props: {
            tour: tour,
            types: types,
            clients: clients.data
        },
    }

}

export default Tour;