import {rget, rpost, rput, rdelete} from '../lib/request';
import cookie from 'js-cookie'


export const addClient = async (values) => {
    const {data} = await rpost('api/clients/create',values, cookie.get('token'));
    return data;
}