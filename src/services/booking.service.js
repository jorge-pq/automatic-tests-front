import {rpost} from '../lib/request';
import cookie from 'js-cookie'


export const addBooking = async (values) => {
    const {data} = await rpost('api/booking/create',values, cookie.get('token'));
    return data;
}

export const getBookings = async (jwt) => {
    const {data} = await rget('api/booking', jwt);
    return data;
};