import React from 'react';
import { Divider, Grid, TextField, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import {create} from '../../services/tenant.service';

const errorText = { color: '#E8530E' };

const CreateTenantContainer = () => {

  const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm();

  const { mutate: createTenant } = useMutation(create, {
    onSuccess: (data) => {
        alert("Empresa registrada satisfactoriamente.");
        reset();
    },
    onError: (error) => {
      alert(error.response.data.message);
    }
});

  const onSubmit = (data) => {
    createTenant(data);
}

  return (
    <Grid container p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Divider>{'Empresa'}</Divider>
      <Grid item xs={12}>
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

      <Divider>{'Usuario'}</Divider>

      <Grid item xs={6}>
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
      <Grid item xs={6}>
        <Controller
          control={control}
          name="username"
          rules={{ required: true }}
          render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Nombre de usuario *'} {...field} />}
        />
        {
          errors.username && <label style={errorText}>{'El nombre de usuario es requerido'}</label>
        }
      </Grid>
      <Grid item xs={6}>
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
      <Grid item xs={6}>
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Contraseña *'} {...field} />}
        />
        {
          errors.password && <label style={errorText}>{'La contraseña es requerida'}</label>
        }
      </Grid>
      <Grid item xs={12}>
        <Button
          variant={'contained'}
          type="submit"
        >
          {'Registrar'}
        </Button>
      </Grid>
      </form>
    </Grid>
  );
};

export default CreateTenantContainer;