import {rget, rpost, rput, rdelete, rpostFormData, getUrlImage} from '../lib/request';
import cookie from 'js-cookie'


export const getTours = async (jwt) => {
    const {data} = await rget('api/tours', jwt);
    return data;
};

export const getToursActive = async (jwt) => {
    const {data} = await rget('api/tours/active', jwt);
    return data;
};

export const getToursSales = async (page, type) => {
    const {data} = await rget(`api/tours/report/sales?date=${type}&page=${page}`, cookie.get('token'));
    return data;
};

export const addTour = async (values) => {
    const {data} = await rpost('api/tours/create',values, cookie.get('token'));
    return data;
}

export const updateTour = async (values) => {
    const {data} = await rput('api/tours/'+values.id, values, cookie.get('token'));
    return data;
}

export const removeTour = async (id) => {
    const {data} = await rdelete('api/tours/'+ id, cookie.get('token'));
    return data;
}

export const getTourById = async (id, jwt) => {
    const {data} = await rget('api/tours/'+id, jwt);
    return data;
};

export const getTourBySlug = async (slug, jwt) => {
    const {data} = await rget('api/tours/slug/'+ slug, jwt);
    return data;
}


export const addDetails = async (values) => {
    const {data} = await rput('api/tour/details/add/'+values.tourId, values, cookie.get('token'));
    return data;
}

export const getAvailability = async (period, tourId) => {
    const {data} = await rget(`api/booking/availability/${period}/${tourId}`, cookie.get('token'));
    return data;
}


export const getAvailabilities = async (tourId) => {
    const {data} = await rget(`api/booking/availabilities/${tourId}`, cookie.get('token'));
    return data;
}

export const upload = async (values) => {
    const {data} = await rpost('api/tours/gallery',values, cookie.get('token'));
    return data;
}