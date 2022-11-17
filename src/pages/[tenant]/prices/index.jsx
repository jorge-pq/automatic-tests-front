import React from 'react';
import dynamic from 'next/dynamic';
import {getHotels} from '../../../services/hotels.service';
import {getCookie} from '../../../lib/session';
import Layout from '../../../layout';
import {redirectToLogin} from '../../../utils/util';


const PricesManageContainer = dynamic(() => import('../../../containers/PricesManageContainer'), {
    suspense: true,
  }) 

const Prices = ({data}) => {
    return (
        <Layout page={'Gestionar precios'}>
            <PricesManageContainer data={data}/>
        </Layout>
    );
};

export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);

    if (!jwt) {
        return redirectToLogin();
    }

    const data = await getHotels(jwt);
    return { props: { data } }

}

export default Prices;