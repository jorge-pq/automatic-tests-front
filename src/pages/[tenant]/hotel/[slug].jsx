import React from 'react';
import {getHotelBySlug} from '../../../services/hotels.service';
import BookingContainer from '../../../containers/BookingContainer';
import {getCookie} from '../../../lib/session';
import {redirectToLogin} from '../../../utils/util';
import Layout from '../../../layout';


const Hotel = ({hotel}) => {
    return (
        <Layout page={hotel.name}>
            <BookingContainer hotel={hotel} />
        </Layout>
    );
};


export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);
	
	if (!jwt) {
		return redirectToLogin();
	}

    const hotel = await getHotelBySlug(ctx.params.slug, jwt);
    return {
        props: {
            hotel: hotel,
        },
    }

}

export default Hotel;