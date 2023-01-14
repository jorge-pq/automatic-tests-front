import * as React from 'react';
import OrdersContainer from '../../containers/OrdersContainer';
import { getBookings } from '../../services/booking.service';
import { getCookie } from '../../lib/session';
import { redirectToLogin } from '../../utils/util';
import Layout from '../../layout';


const Orders = ({ bookings, page, totalPages }) => {
  return (
    <Layout page={'Órdenes'}>
      <OrdersContainer bookings={bookings} page={page} totalPages={totalPages} />
    </Layout>
  );

}


export async function getServerSideProps(ctx) {

  let jwt = getCookie("token", ctx.req);

  if (!jwt) {
    return redirectToLogin();
  }

  let page = ctx.query.page || 1;
  const bookings = await getBookings(jwt, page);
  return {
    props: {
      bookings: bookings.data,
      totalPages: bookings.pages,
      page: page
    },
  }

}


export default Orders;
