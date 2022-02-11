import axios from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API;

const getUrl = endpoint => `${API_HOST}/${endpoint}`;

export const getUrlImage = () => `${process.env.NEXT_PUBLIC_API}/public/`;

export const rget = async (endpoint, jwt) => {
    const headers = jwt
        ? {
            headers: { 'authorization': jwt }
        }
        : null;
    return await axios.get(getUrl(endpoint), headers);
};

export const rpost = async (endpoint, data, jwt) => {
    const headers = jwt
        ? {headers: {"Content-Type": "application/json", 'authorization': jwt }}
        : {headers: { "Content-Type": "application/json" }}
    ;

    return await axios.post(getUrl(endpoint), data, headers);
};


export const rput = async (endpoint, data, jwt) => {
    const headers = jwt
        ? {headers: {"Content-Type": "application/json", 'authorization': jwt }}
        : {headers: {"Content-Type": "application/json"}}
    ;
    return await axios.put(getUrl(endpoint), data, headers);
};

export const rdelete = async (endpoint, jwt) => {
    const headers = jwt
        ? {
            headers: { 'authorization': jwt }
        }
        : null;
    return await axios.delete(getUrl(endpoint), headers);
};

export const rpostFormData = async (endpoint, data, jwt) => {

    const headers = jwt
        ? {headers: {'Content-Type': `multipart/form-data`, 'Authorization': `Bearer ${jwt}` }}
        : {headers: {'Content-Type': `multipart/form-data` }}
    ;
    return await axios.post(getUrl(endpoint), data, headers);
};
