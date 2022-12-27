import * as React from 'react';
import ClientsContainer from '../../containers/ClientsContainer';
import { getClients } from '../../services/hotels.service';
import { getCookie } from '../../lib/session';
import { redirectToLogin } from '../../utils/util';
import Layout from '../../layout';


const Clients = ({ clients, page, totalPages }) => {
  return (
    <Layout page={'Clientes'}>
      <ClientsContainer clients={clients} page={page} totalPages={totalPages} />
    </Layout>
  );

}


export async function getServerSideProps(ctx) {

  let jwt = getCookie("token", ctx.req);

  if (!jwt) {
    return redirectToLogin();
  }

  let page = ctx.query.page || 1;
  const clients = await getClients(jwt, page);

  return {
    props: {
        clients: clients.data,
        totalPages: clients.pages,
        page: page
    },
  }

}


export default Clients;
