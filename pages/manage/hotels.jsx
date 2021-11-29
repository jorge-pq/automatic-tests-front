import React from 'react';
import HotelsManageContainer from '../../src/containers/HotelsManageContainer';
import {getHotels} from '../../src/services/hotels.service';


const hotels = ({data}) => {
    return (
        <div>
            <HotelsManageContainer data={data}/>
        </div>
    );
};

export async function getServerSideProps(ctx) {

    // let jwt = getCookie("accessToken", ctx.req);

    // if (!jwt) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false,
    //         },
    //     }
    // }

    const data = await getHotels();
    return { props: { data } }

}

export default hotels;