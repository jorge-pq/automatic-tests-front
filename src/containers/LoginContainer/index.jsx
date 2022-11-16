import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import AuthContext from '../../providers/AuthContext';
import cookie from 'js-cookie';
import { useMutation } from 'react-query';
import { login } from '../../services/user.service';
import { Controller, useForm } from 'react-hook-form';

const theme = createTheme();
const errorText = { color: '#E8530E' };

const LoginContainer = () => {

  const { setAuth, setUser } = useContext(AuthContext);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, formState: { errors }, control } = useForm();

  const { mutate: authenticate } = useMutation(login, {
    onSuccess: (data) => {
      cookie.set('token', data.token);
      cookie.set('user', JSON.stringify(data.user));
      setAuth(true);
      setUser(data.user);
      setIsLoading(false);
      router.push('/');
    },
    onError: (error) => {
      setIsLoading(false);
      alert(error)
    }
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    authenticate(data);
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
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: 'inherit' }}>
            <Controller
              control={control}
              name="username"
              rules={{ required: true }}
              render={({ field }) => <TextField margin="normal" fullWidth autoFocus autoComplete="phone" label={'Teléfono *'} {...field} />}
            />
            {
              errors.username && <label style={errorText}>{'El nombre de usuario es requerido'}</label>
            }
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field }) => <TextField margin="normal" type="password" fullWidth label={'Contraseña *'} {...field} />}
            />
            {
              errors.password && <label style={errorText}>{'La contraseña es requerida'}</label>
            }
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
              type="submit"
            >
              {'Entrar'}
            </Button>
          </form>
        </Box>

      </Container>

    </ThemeProvider>
  );
};

export default LoginContainer;