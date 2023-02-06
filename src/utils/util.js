
export const redirectToLogin = () => {
    return {
        redirect: {
            destination: '/login',
            permanent: false,
        }
    }
}


export const getParameters = params => {
   let p = params.length>0?'?':'';
    if(params.length>0){
         params.map((item, index) => p+=(`${item.key && item.value ? `${item.key}=${item.value}`: ''}${params.length-1>index?'&':''}`))
        // p+=query;
    }
   return p;
}