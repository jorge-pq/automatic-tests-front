import {rget, rpost, rput} from '../lib/request';
import cookie from 'js-cookie'


export const addBooking = async (values) => {
    const {data} = await rpost('api/booking/create',values, cookie.get('token'));
    return data;
}

export const getBookings = async (jwt, page) => {
    const {data} = await rget('api/booking?page='+page, jwt);
    return data;
};

export const getOrderById = async (id, jwt) => {
    const {data} = await rget('api/booking/'+id, jwt);
    return data;
};

export const updateBooking = async (obj) => {
    const {data} = await rput('api/booking/update/'+obj.id, obj.values, cookie.get('token'));
    return data;
}