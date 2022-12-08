import React from 'react';
import dynamic from 'next/dynamic';
import {getHotelById, getRoomTypes} from '../../../../services/hotels.service';
import {getCookie} from '../../../../lib/session';
import Layout from '../../../../layout';


const RoomsManageContainer = dynamic(() => import('../../../../containers/RoomsManageContainer'), {
    suspense: true,
  }) 


const RoomsManage = ({hotel, types}) => {
    return (
        <Layout page={'Gestionar habitaciones'}>
            <RoomsManageContainer hotel={hotel} roomTypes={types} />
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
    const types = await getRoomTypes(jwt);
   
    return {
        props: {
            hotel: hotel,
            types: types
        },
    }

}

export default RoomsManage;