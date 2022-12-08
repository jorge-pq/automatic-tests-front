import * as React from 'react';
import ToursContainer from '../../containers/ToursContainer';
import { getToursActive } from '../../services/tours.service';
import {getCookie} from '../../lib/session';
import {redirectToLogin} from '../../utils/util';
import Layout from '../../layout';

const Booking = ({ data }) => {
  return (
    <Layout page={'Tours'}>
      <ToursContainer data={data} />
    </Layout>
  );

}


export async function getServerSideProps(ctx) {

  let jwt = getCookie("token", ctx.req);
	
	if (!jwt) {
		return redirectToLogin();
	}

 const data = await getToursActive(jwt);
  return { props: { data } }

}


export default Booking;
