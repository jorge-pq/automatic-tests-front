import {rget, rpost, rput, rdelete} from '../lib/request';

export const getTest = async (id) => {
    const {data} = await rget('api/test/'+id, null);
    return data;
};

export const getAllTests = async () => {
    const {data} = await rget('api/tests', null);
    return data;
};


export const addUrl = async (values) => {
    const {data} = await rpost('api/test/create/'+values.appId, values.data);
    return data;
};

export const updateUrl = async (values) => {
    const {data} = await rput('api/test/update/'+values.id, values.data);
    return data;
};


export const runAllTestByApp = async (id) => {
    const {data} = await rget('api/test/runAll/'+id, null);
    return data;
};

export const removeTest = async (id) => {
    const {data} = await rdelete('api/test/remove/'+id, null);
    return data;
};
