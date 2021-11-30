import React, { useState, useContext } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import {useRouter} from 'next/router';
import AuthContext from '../src/providers/AuthContext';
import cookie from 'js-cookie';

const secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODkzMjY3IiwibmFtZSI6IkJvb2tpbmdSZW5lIiwiaWF0IjoxNTE2MjM5MDIyfQ.ijULaJ83WAhRjDfCfuqco3tSur0BQt5ToAVHkrH3WZw";

const login = () => {

    const {setAuth} = useContext(AuthContext);
    const router = useRouter();
    const [token, setToken] = useState('');

    const handleToken = e => setToken(e.target.value);

    const handleSubmit = () => {
        if(token === secret){
            cookie.set("token", secret);
            setAuth(true);
            router.push('/');
        }
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item xs={6} pt={10}>
                <TextField
                    margin={'normal'}
                    fullWidth
                    value={token}
                    onChange={handleToken}
                    label={'Password'}
                />
                <Button fullWidth variant={'contained'} onClick={handleSubmit}>{'Entrar'}</Button>
            </Grid>
        </Grid>
    );
};

export default login;