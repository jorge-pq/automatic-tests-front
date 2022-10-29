import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRouter} from 'next/router';
import AuthContext from '../providers/AuthContext';
import cookie from 'js-cookie';
import {useMutation} from 'react-query';
import {login} from '../services/user.service';


const theme = createTheme();


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
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {'Iniciar sesión'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={username}
                onChange={handleUser}
                label={'Telefono'}
                autoComplete="phone"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={handlePass}
                label="Contraseña"
                type="password"
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
                onClick={handleSubmit}
                >
                    {'Entrar'}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
};

export default auth;