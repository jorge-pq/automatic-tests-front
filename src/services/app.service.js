import {rget, rpost} from '../lib/request';

export const getApps = async () => {
    const {data} = await rget('api/apps', null);
    return data;
};

export const saveNewApp = async (values) => {
    const {data} = await rpost('api/apps', values);
    return data;
};