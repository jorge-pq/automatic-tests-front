import * as React from 'react';
import HotelsContainer from '../../containers/HotelsContainer';
import { getHotels } from '../../services/hotels.service';
import {getCookie} from '../../lib/session';
import {redirectToLogin, normalizeUserCookie, redirectToTenat} from '../../utils/util';
import Layout from '../../layout';

const Home = ({ data }) => {
  return (
    <Layout page={'Hoteles'}>
      <HotelsContainer data={data} />
    </Layout>
  );

}


export async function getServerSideProps(ctx) {

  let jwt = getCookie("token", ctx.req);
	
	if (!jwt) {
		return redirectToLogin();
	}

  const data = await getHotels(jwt);
  return { props: { data } }

}


export default Home;
