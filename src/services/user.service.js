import {rget, rpost, rput, rdelete} from '../lib/request';
import cookie from 'js-cookie';

export const login = async (values) => {
    const {data} = await rpost('api/auth/login', values);
    return data;
};

// export const add = async (values) => {
//     const {data} = await rpost('user/register', values);
//     return data;
// };

// export const update = async (values) => {
//     const {data} = await rput('user/update', values);
//     return data;
// };

// export const remove = async (id) => {
//     const {data} = await rdelete('user/'+id);
//     return data;
// };


// export const getUsers = async () => {
//     const {data} = await rget('user',cookie.get('token'));
//     return data;
// };

