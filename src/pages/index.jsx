import * as React from 'react';
import {getCookie} from '../lib/session';
import {redirectToLogin, redirectToTenat, normalizeUserCookie} from '../utils/util';


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

  let user = normalizeUserCookie(getCookie('user', ctx.req));

  return redirectToTenat(user.tenant?.name);

}


export default Index;
