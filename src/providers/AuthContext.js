import {createContext} from 'react'; 

const AuthContext = createContext({
    isAuth: false, 
    user: null,
    setAuth: null,
    setUser: null,
});

export default AuthContext;