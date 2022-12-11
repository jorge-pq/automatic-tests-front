import React from 'react';
import {getOrderById} from '../../../services/booking.service';
import OrderDetailsContainer from '../../../containers/OrderDetailsContainer';
import OrderTourDetailsContainer from '../../../containers/OrderDetailsContainer/OrderTourDetailsContainer';
import {getCookie} from '../../../lib/session';
import {redirectToLogin} from '../../../utils/util';
import Layout from '../../../layout';


const Order = ({order}) => {
    return (
        <Layout page={'Factura'}>
            {
                order.type === "hotel" || !order.type ? <OrderDetailsContainer order={order} /> : <OrderTourDetailsContainer order={order} />
            }
        </Layout>
    );
};


export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);
	
	if (!jwt) {
		return redirectToLogin();
	}

    const order = await getOrderById(ctx.params.id, jwt);
    return {
        props: {
            order: order,
        },
    }

}

export default Order;