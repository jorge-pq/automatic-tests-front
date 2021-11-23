import {hotels} from '../../data/hotels'

export const getHotel = slug => {
    return hotels.find(d=>d.slug === slug);
}
export const getHotelById = id => {
    return hotels.find(d=>d.id === parseInt(id));
}