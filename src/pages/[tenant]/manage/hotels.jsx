import React from 'react';
import HotelsManageContainer from '../../../containers/HotelsManageContainer';
import {getHotels} from '../../../services/hotels.service';
import {getCookie} from '../../../lib/session';

const hotels = ({data}) => {
    return (
        <div>
            <HotelsManageContainer data={data}/>
        </div>
    );
};

export async function getServerSideProps(ctx) {

    let jwt = getCookie("token", ctx.req);

    if (!jwt) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    const data = await getHotels();
    return { props: { data } }

}

export default hotels;