import React from 'react';
import {getHotelById} from '../../../../services/hotels.service';
import RoomsManageContainer from '../../../../containers/RoomsManageContainer';
import {getCookie} from '../../../../lib/session';
import Layout from '../../../../layout';

const RoomsManage = ({hotel}) => {
    return (
        <Layout page={'Gestionar habitaciones'}>
            <RoomsManageContainer hotel={hotel} />
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

    const hotel = await getHotelById(ctx.params.id, jwt);
   
    return {
        props: {
            hotel: hotel,
        },
    }

}

export default RoomsManage;