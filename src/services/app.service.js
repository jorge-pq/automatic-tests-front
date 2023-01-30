import {rget} from '../lib/request';

export const getApps = async () => {
    const {data} = await rget('api/apps', null);
    return data;
};
