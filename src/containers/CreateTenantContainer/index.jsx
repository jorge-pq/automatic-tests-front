import React from 'react';
import { Divider, Grid, TextField, Button, Paper, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { create } from '../../services/tenant.service';
import { useMutation } from 'react-query';
import {useRouter} from 'next/router';
import {getTenant} from '../../utils/util';


const errorText = { color: '#E8530E' };

const CreateTenantContainer = () => {

  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm();

  const { mutate: createTenant } = useMutation(create, {
    onSuccess: (data) => {
      alert("Empresa registrada satisfactoriamente.");
      router.push(`/${getTenant()}/business`);
    },
    onError: (error) => {
      alert(error.response.data.message);
    }
  });

  const onSubmit = (data) => {
    createTenant(data);
  }

  return (
    <Grid container pt={2} justifyContent={'center'}>
      <Paper elevation={3} sx={{pt:3}}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: 'inherit' }}>
        <Divider><Typography variant='overline'>{'Empresa'}</Typography></Divider>
        <Grid item xs={12} my={3}>
          <Grid container justifyContent={'center'} spacing={2}>
            <Grid item md={5} xs={11}>
              <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Nombre *'} {...field} />}
              />
              {
                errors.name && <label style={errorText}>{'El nombre de la empresa es requerido'}</label>
              }
            </Grid>
            <Grid item md={5} xs={11}>
              <Controller
                control={control}
                name="phoneAgency"
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Teléfono'} {...field} />}
              />
            </Grid>
            <Grid item md={5} xs={11}>
              <Controller
                control={control}
                name="state"
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Estado'} {...field} />}
              />
            </Grid>
            <Grid item md={5} xs={11}>
              <Controller
                control={control}
                name="city"
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Ciudad'} {...field} />}
              />
            </Grid>
            <Grid item md={5} xs={11}>
              <Controller
                control={control}
                name="address"
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Dirección'} {...field} />}
              />
            </Grid>
            <Grid item md={5} xs={11}>
              <Controller
                control={control}
                name="zipCode"
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Código postal'} {...field} />}
              />
            </Grid>
          </Grid>
        </Grid>

        <Divider><Typography variant='overline'>{'Usuario'}</Typography></Divider>

        <Grid item xs={12} my={3}>
          <Grid container justifyContent={'center'} spacing={2}>
            <Grid item md={7} xs={11}>
              <Controller
                control={control}
                name="fullname"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Nombre y apellidos *'} {...field} />}
              />
              {
                errors.fullname && <label style={errorText}>{'El nombre completo del usuario es requerido'}</label>
              }
            </Grid>
            <Grid item md={7} xs={11}>
              <Controller
                control={control}
                name="phone"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Telefono *'} {...field} />}
              />
              {
                errors.phone && <label style={errorText}>{'El telefono es requerido'}</label>
              }
            </Grid>
            <Grid item md={7} xs={11}>
              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} type={'password'} fullWidth placeholder={'Contraseña *'} {...field} />}
              />
              {
                errors.password && <label style={errorText}>{'La contraseña es requerida'}</label>
              }
            </Grid>
            <Grid item md={7} xs={11} textAlign={'right'}>
              <Button
                variant={'contained'}
                type="submit"
              >
                {'Registrar'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      </Paper>
    </Grid>
  );
};

export default CreateTenantContainer;