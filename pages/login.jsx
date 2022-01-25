import React, { useState, useContext } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import {useRouter} from 'next/router';
import AuthContext from '../src/providers/AuthContext';
import cookie from 'js-cookie';

const secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODkzMjY3IiwibmFtZSI6IkJvb2tpbmdSZW5lIiwiaWF0IjoxNTE2MjM5MDIyfQ.ijULaJ83WAhRjDfCfuqco3tSur0BQt5ToAVHkrH3WZw";

const credentials = {
    username: 'Admin',
    password: 'Miami2022@'
}    

const login = () => {

    const {setAuth} = useContext(AuthContext);
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUser = e => setUsername(e.target.value);

    const handlePass = e => setPassword(e.target.value);

    const handleSubmit = () => {
        if(username === credentials.username && password === credentials.password){
            cookie.set("token", secret);
            setAuth(true);
            router.push('/');
        }
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
                <Button fullWidth variant={'contained'} onClick={handleSubmit}>{'Entrar'}</Button>
            </Grid>
        </Grid>
    );
};

export default login;