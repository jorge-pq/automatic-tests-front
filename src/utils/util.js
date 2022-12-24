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

export const convertExcelToArray = excel => {
    const columns = excel[0].length;
    let list = [];
    for (let rows = 1; rows < excel.length; rows++) {
        var item = new Object();
        for (let column = 0; column < columns; column++) {
            let key = getKey(column);
            let value = excel[rows][column]
            item[key] = value;
        }
        list.push(item);
    }
    return list;
};


function getKey(value){
    switch (value) {
        case 0:
            return 'name'
        case 1:
             return 'secondname'
        case 2:
             return 'lastname'
        case 3:
            return 'phone'
        case 4:
            return 'email'
        case 5:
            return 'address'
        case 6:
            return 'state'
        case 7:
            return 'city'
        case 8:
            return 'zipcode'
        default:
            return 'nokey';
    }
}