import * as React from 'react';
import AddUserContainer from '../../containers/AddUserContainer';
import { getHotels } from '../../services/hotels.service';
import {getCookie} from '../../lib/session';
import {redirectToLogin} from '../../utils/util';
import Layout from '../../layout';


const AddUser = () => {
  return (
    <Layout page={'Agregar usuario'}>
      <AddUserContainer />
    </Layout>
  );

}


export async function getServerSideProps(ctx) {

  let jwt = getCookie("token", ctx.req);
	
	if (!jwt) {
		return redirectToLogin();
	}

  return { props: { } }
}


export default AddUser;
