import {rget, rpost, rput, rdelete} from '../lib/request';
import cookie from 'js-cookie';

export const create = async (values) => {
    const {data} = await rpost('api/tenant/create', values, cookie.get("token"));
    return data;
};


export const getTenants = async (jwt) => {
    const {data} = await rget('api/tenant/brokers', jwt);
    return data;
};
