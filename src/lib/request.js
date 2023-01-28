import axios from "axios";


export const rget = async (endpoint, jwt) => {
    const headers = jwt
        ? {
            headers: { 'authorization': jwt }
        }
        : null;
    return await axios.get(endpoint, headers);
};

export const rpost = async (endpoint, data, jwt) => {
    const headers = jwt
        ? {headers: {"Content-Type": "application/json", 'authorization': jwt }}
        : {headers: { "Content-Type": "application/json" }}
    ;

    return await axios.post(endpoint, data, headers);
};


export const rput = async (endpoint, data, jwt) => {
    const headers = jwt
        ? {headers: {"Content-Type": "application/json", 'authorization': jwt }}
        : {headers: {"Content-Type": "application/json"}}
    ;
    return await axios.put(endpoint, data, headers);
};

export const rdelete = async (endpoint, jwt) => {
    const headers = jwt
        ? {
            headers: { 'authorization': jwt }
        }
        : null;
    return await axios.delete(endpoint, headers);
};

export const rpostFormData = async (endpoint, data, jwt) => {

    const headers = jwt
        ? {headers: {'Content-Type': `multipart/form-data`, 'Authorization': `Bearer ${jwt}` }}
        : {headers: {'Content-Type': `multipart/form-data` }}
    ;
    return await axios.post(endpoint, data, headers);
};
