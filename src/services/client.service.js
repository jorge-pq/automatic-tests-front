import {rget, rpost, rput, rdelete} from '../lib/request';
import cookie from 'js-cookie'


export const addClient = async (values) => {
    const {data} = await rpost('api/clients/create',values, cookie.get('token'));
    return data;
}

export const addClientBulk = async (values) => {
    const {data} = await rpost('api/clients/import',values, cookie.get('token'));
    return data;
}


export const getClientByPhone = async (values) => {
    const {data} = await rpost('api/clients/search-phone',values, cookie.get('token'));
    return data;
}

export const getClientCount = async () => {
    const {data} = await rget('api/clients/count', cookie.get('token'));
    return data;
};
export const updateClient = async (values) => {
    const {data} = await rput('api/clients/'+values.id, values, cookie.get('token'));
    return data;
}
