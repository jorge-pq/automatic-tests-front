import React, {useState, useEffect} from 'react';
import AuthContext from './AuthContext';
import cookie from 'js-cookie';

function AuthProvider(props) {

    const [isAuth, setAuth] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        let token = cookie.get('token');
        let user = cookie.get('user') && JSON.parse(cookie.get('user'));
        setAuth(token?true:false);
        setUser(user?user:null);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setAuth, user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;