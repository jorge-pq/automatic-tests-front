import * as React from 'react';
import OrdersContainer from '../../containers/OrdersContainer';
import { getBookings } from '../../services/booking.service';
import { getCookie } from '../../lib/session';
import { redirectToLogin } from '../../utils/util';
import Layout from '../../layout';


const Orders = ({ bookings }) => {
  return (
    <Layout page={'Órdenes'}>
      <OrdersContainer bookings={bookings} />
    </Layout>
  );

}


export async function getServerSideProps(ctx) {

  let jwt = getCookie("token", ctx.req);

  if (!jwt) {
    return redirectToLogin();
  }

  const bookings = await getBookings(jwt);
  return {
    props: {
      bookings: bookings,
    },
  }

}


export default Orders;
