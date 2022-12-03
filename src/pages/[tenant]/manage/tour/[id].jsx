import React from 'react';
import dynamic from 'next/dynamic';
import {getRoomTypes} from '../../../../services/hotels.service';
import {getTourById} from '../../../../services/tours.service';
import {getCookie} from '../../../../lib/session';
import Layout from '../../../../layout';


const TourDetailsManageContainer = dynamic(() => import('../../../../containers/TourDetailsManageContainer'), {
    suspense: true,
  }) 


const RoomsManage = ({tour, types}) => {
    return (
        <Layout page={'Gestionar detalles del tour'}>
            <TourDetailsManageContainer tour={tour} roomTypes={types} />
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

    const tour = await getTourById(ctx.params.id, jwt);
    const types = await getRoomTypes(jwt);
   
    return {
        props: {
            tour: tour,
            types: types
        },
    }

}

export default RoomsManage;