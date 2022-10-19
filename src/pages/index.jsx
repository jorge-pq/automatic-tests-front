import * as React from 'react';
import HotelsContainer from '../containers/HotelsContainer';
import { getHotels } from '../services/hotels.service';
import {getCookie} from '../lib/session';
import {redirectToLogin, redirectToTenat} from '../utils/util';

const Index = () => {
  return (
    <>
    </>
  );

}


export async function getServerSideProps(ctx) {

  let jwt = getCookie("token", ctx.req);
	
	if (!jwt) {
		return redirectToLogin();
	}
  let user = JSON.parse(getCookie('user', ctx.req));

  return redirectToTenat(user.tenant.name);

}


export default Index;
