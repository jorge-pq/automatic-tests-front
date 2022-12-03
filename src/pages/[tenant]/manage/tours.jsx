import React from 'react';
import dynamic from 'next/dynamic';
import {getTours} from '../../../services/tours.service';
import {getCookie} from '../../../lib/session';
import Layout from '../../../layout';
import {redirectToLogin} from '../../../utils/util';


const ToursManageContainer = dynamic(() => import('../../../containers/ToursManageContainer'), {
    suspense: true,
  }) 

const tours = ({data}) => {
    return (
        <Layout page={'Gestionar tours'}>
            <ToursManageContainer data={data}/>
        </Layout>
    );
};

export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);

    if (!jwt) {
        return redirectToLogin();
    }

    const data = await getTours(jwt);
    return { props: { data } }

}

export default tours;