
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
    }
   return p;
}

export const getFormData = params => {
    let form = new FormData();
     if(params.length>0){
          params.map(item => form[item.key] = item.value)
     }
    return form;
 }

 export const getHeaders = params => {
    
 }