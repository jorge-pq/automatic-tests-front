import React from 'react';
import { getRoomTypes } from '../../../services/hotels.service';
import RoomTypesManageContainer from '../../../containers/RoomTypesManageContainer';
import { getCookie } from '../../../lib/session';
import Layout from '../../../layout';
import { redirectToLogin } from '../../../utils/util';


const room_types = ({ types }) => {
    return (
        <Layout page={'Tipos de habitaciones'}>
            <RoomTypesManageContainer types={types} />
        </Layout>
    );
};


export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);

    if (!jwt) {
        return redirectToLogin();
    }

    const types = await getRoomTypes(jwt);

    return {
        props: {
            types: types,
        },
    }

}

export default room_types;