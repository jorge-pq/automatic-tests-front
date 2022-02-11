import {rget, rpost, rput, rdelete, rpostFormData, getUrlImage} from '../lib/request';
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

export const removeHotel = async (id) => {
    const {data} = await rdelete('api/hotel/'+ id, cookie.get('token'));
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


export const removeRoom = async (values) => {
    const {data} = await rput('api/room/remove', values, cookie.get('token'));
    return data;
}

export const updateRoom = async (values) => {
    const {data} = await rput('api/room/update/'+values.hotelId, values, cookie.get('token'));
    return data;
}


export const getHotelBySlug = async (slug) => {
    const {data} = await rget('api/hotel/slug/'+ slug);
    return data;
}


export const upload = async (values) => {
    const {data} = await rpost('api/hotels/gallery',values, cookie.get('token'));
    return data;
}

export const getImage = (fileName) => {
    return `${getUrlImage()}/${fileName}`;
}


export const test = async () => {
  
}
