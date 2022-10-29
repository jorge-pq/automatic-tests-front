import * as React from 'react';
import TenantContainer from '../../containers/TenantContainer';
import { getTenants } from '../../services/tenant.service';
import { getCookie } from '../../lib/session';
import { redirectToLogin } from '../../utils/util';
import Layout from '../../layout';


const Business = ({ tenants }) => {
  return (
    <Layout page={'Empresas'}>
      <TenantContainer data={tenants} />
    </Layout>
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
