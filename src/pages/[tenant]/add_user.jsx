import * as React from 'react';
import AddUserContainer from '../../containers/AddUserContainer';
import { getHotels } from '../../services/hotels.service';
import {getCookie} from '../../lib/session';
import {redirectToLogin} from '../../utils/util';

const AddUser = () => {
  return (
    <>
      <AddUserContainer />
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


export default AddUser;
