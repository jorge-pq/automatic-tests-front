import React from 'react';
import dynamic from 'next/dynamic';
import { getUsers } from '../../../services/user.service';
import { getCookie } from '../../../lib/session';
import { redirectToLogin } from '../../../utils/util';
import Layout from '../../../layout';

const UsersContainer = dynamic(() => import('../../../containers/UsersContainer'), {
    suspense: true,
})

const Users = ({ users}) => {
    return (
        <Layout page={'Usuarios'}>
            <UsersContainer users={users} />
        </Layout>
    );
};


export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);

    if (!jwt) {
        return redirectToLogin();
    }

    const users = await getUsers(ctx.params.tenant, jwt);

    return {
        props: {
            users: users
        },
    }

}

export default Users;