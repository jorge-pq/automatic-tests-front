import React from 'react';
import HotelsManageContainer from '../../../containers/HotelsManageContainer';
import {getHotels} from '../../../services/hotels.service';
import {getCookie} from '../../../lib/session';
import Layout from '../../../layout';

const hotels = ({data}) => {
    return (
        <Layout page={'Gestionar hoteles'}>
            <HotelsManageContainer data={data}/>
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

    const data = await getHotels(jwt);
    return { props: { data } }

}

export default hotels;