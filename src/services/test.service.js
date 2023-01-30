import {rpost, rput} from '../lib/request';

export const addUrl = async (values) => {
    const {data} = await rpost('api/test/create/'+values.appId, values.data);
    return data;
};
