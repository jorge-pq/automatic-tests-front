import {getCookie} from '../lib/session';

export const getSlug = name => {
    return name
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(" ")
    .join("-");    
} 

export const redirectToLogin = () => {
    return {
        redirect: {
            destination: '/login',
            permanent: false,
        }
    }
}

export const redirectToTenat = (tenant) => {
    let pathBase = tenant ? tenant.replace(/ /g, "-").toLowerCase() + '/dashboard' : 'sys-admin/business'
    return {
        redirect: {
            destination: `/${pathBase}`,
            permanent: false,
        }
    }
}


export const getTenant = () => {
    let user = JSON.parse(getCookie('user'));
    return user?.tenant?.name ? user?.tenant?.name.replace(/ /g, "-").toLowerCase() : 'sys-admin';
}

export const normalizeUserCookie = (value) => {

    return JSON.parse(
        value
        .replace(/%22/g, `"`)
        .replace(/%2C/g, ",")
        .replace(/%20/g, " ")
        .replace(/\\/g, ""));
}