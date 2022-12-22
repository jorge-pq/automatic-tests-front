import * as React from 'react';
import ClientsContainer from '../../containers/ClientsContainer';
import { getClients } from '../../services/hotels.service';
import { getCookie } from '../../lib/session';
import { redirectToLogin } from '../../utils/util';
import Layout from '../../layout';


const Clients = ({ clients }) => {
  return (
    <Layout page={'Clientes'}>
      <ClientsContainer clients={clients} />
    </Layout>
  );

}


export async function getServerSideProps(ctx) {

  let jwt = getCookie("token", ctx.req);

  if (!jwt) {
    return redirectToLogin();
  }

  const clients = await getClients(jwt);

  return {
    props: {
        clients: clients,
    },
  }

}


export default Clients;
