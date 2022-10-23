import * as React from 'react';
import HotelsContainer from '../../containers/HotelsContainer';
import { getHotels } from '../../services/hotels.service';
import {getCookie} from '../../lib/session';
import {redirectToLogin, normalizeUserCookie, redirectToTenat} from '../../utils/util';

const Home = ({ data }) => {
  return (
    <>
      <HotelsContainer data={data} />
    </>
  );

}


export async function getServerSideProps(ctx) {

  let jwt = getCookie("token", ctx.req);
	
	if (!jwt) {
		return redirectToLogin();
	}

  const data = await getHotels();
  return { props: { data } }

}


export default Home;
