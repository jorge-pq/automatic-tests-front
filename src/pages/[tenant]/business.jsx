import * as React from 'react';
import TenantContainer from '../../containers/TenantContainer';
import { getTenants } from '../../services/tenant.service';
import {getCookie} from '../../lib/session';
import {redirectToLogin} from '../../utils/util';

const Business = ({tenants}) => {
  return (
    <TenantContainer data={tenants}/>
  );

}


export async function getServerSideProps(ctx) {

  let jwt = getCookie("token", ctx.req);
	
	if (!jwt) {
		return redirectToLogin();
	}

  const tenants = await getTenants(jwt);
  return {
      props: {
          tenants: tenants,
      },
  }

}


export default Business;
