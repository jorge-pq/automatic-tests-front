import React, { useState, useContext } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import {useRouter} from 'next/router';
import AuthContext from '../providers/AuthContext';
import cookie from 'js-cookie';
import {useMutation} from 'react-query';
import {login} from '../services/user.service';

const auth = () => {

    const {setAuth, setUser} = useContext(AuthContext);
    const router = useRouter();

    const { mutate: authenticate, isLoading, isError } = useMutation(login, {
        onSuccess: (data) => {
            cookie.set('token', data.token);
            cookie.set('user', JSON.stringify(data.user));
            setAuth(true);
            setUser(data.user);
            router.push('/');
        },
        onError: (error) => {
           alert(error)
        }
    });

 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUser = e => setUsername(e.target.value);

    const handlePass = e => setPassword(e.target.value);

    const handleSubmit = () => {
        authenticate({username: username, password: password});
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item xs={12} md={6} pt={10}>
            <TextField
                    margin={'normal'}
                    fullWidth
                    value={username}
                    onChange={handleUser}
                    label={'Usuario'}
                />
                <TextField
                    margin={'normal'}
                    fullWidth
                    value={password}
                    onChange={handlePass}
                    label={'Password'}
                    type={'password'}
                />
                <Button fullWidth variant={'contained'} disabled={isLoading} onClick={handleSubmit}>{'Entrar'}</Button>
            </Grid>
        </Grid>
    );
};

export default auth;