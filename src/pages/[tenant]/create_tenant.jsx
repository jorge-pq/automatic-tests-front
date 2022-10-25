import * as React from 'react';
import CreateTenantContainer from '../../containers/CreateTenantContainer';
import { getHotels } from '../../services/hotels.service';
import {getCookie} from '../../lib/session';
import {redirectToLogin} from '../../utils/util';

const CreateTenant = () => {
  return (
    <>
      <CreateTenantContainer />
    </>
  );

}


export async function getServerSideProps(ctx) {

  let jwt = getCookie("token", ctx.req);
	
	if (!jwt) {
		return redirectToLogin();
	}

  return { props: { } }
}


export default CreateTenant;