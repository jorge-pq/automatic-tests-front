import {rget, rpost, rput, rdelete} from '../lib/request';
import cookie from 'js-cookie'


export const getHotels = async () => {
    const {data} = await rget('api/hotels');
    return data;
};

export const addHotel = async (values) => {
    const {data} = await rpost('api/hotels/create',values, cookie.get('token'));
    return data;
}

export const updateHotel = async (values) => {
    const {data} = await rput('api/hotel/'+values.id, values, cookie.get('token'));
    return data;
}

export const getHotelById = async (id) => {
    const {data} = await rget('api/hotel/'+id, cookie.get('token'));
    return data;
};

export const addRoom = async (values) => {
    const {data} = await rput('api/room/add/'+values.hotelId, values, cookie.get('token'));
    return data;
}

