import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import DatePicker from 'react-datepicker';
import { styled } from '@mui/material/styles';


const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
  border: '1px solid #bfbfbf',
  borderRadius: '3px',
  height: '40px',
  padding: '2.5px 4px 2.5px 6px',
  width: '100%'
}));


const errorText = { color: '#E8530E' };


export default function ClientCreateDialog({ open, close, save }) {

  const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm();
  
  const [birthday, setBirthday] = useState();
  
  const onSubmit = (data) => {
    data.birthday = birthday;
    save(data);
  }

  return (
    <Dialog open={open} onClose={close}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: 'inherit' }}>
        <DialogTitle>{'Nuevo cliente'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Nombre *'} {...field} />}
              />
              {
                errors.name && <label style={errorText}>{'El nombre es requerido'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="secondname"
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Segundo nombre'} {...field} />}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                control={control}
                name="lastname"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Primer apellido *'} {...field} />}
              />
              {
                errors.lastname && <label style={errorText}>{'El primer apellido es requerido'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="secondlastname"
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Segundo apellido'} {...field} />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="phone"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Telefono *'} {...field} />}
              />
              {
                errors.phone && <label style={errorText}>{'El Telefono es requerido'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} type={'email'} fullWidth placeholder={'Correo *'} {...field} />}
              />
              {
                errors.email && <label style={errorText}>{'El correo es requerido'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <DatePickerCustom
                selected={birthday}
                onChange={(date) => setBirthday(date)}
                withPortal
                isClearable={true}
                showYearDropdown
                placeholderText={'Fecha de nacimiento'}
              />
              {
                errors.birthday && !birthday && <label style={errorText}>{'La fecha de nacimiento es requerida'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="clientID"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} type={'text'} fullWidth placeholder={'ID *'} {...field} />}
              />
              {
                errors.clientID && <label style={errorText}>{'El ID es requerido'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="state"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} type={'text'} fullWidth placeholder={'Estado *'} {...field} />}
              />
              {
                errors.state && <label style={errorText}>{'El Estado es requerido'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="city"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} type={'text'} fullWidth placeholder={'Ciudad *'} {...field} />}
              />
              {
                errors.city && <label style={errorText}>{'La Ciudad es requerida'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="address"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} type={'text'} fullWidth placeholder={'Dirección *'} {...field} />}
              />
              {
                errors.address && <label style={errorText}>{'La Dirección es requerida'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="zipcode"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} type={'text'} fullWidth placeholder={'Código postal *'} {...field} />}
              />
              {
                errors.zipcode && <label style={errorText}>{'El código postal es requerido'}</label>
              }
            </Grid>

        </Grid>
      </DialogContent>
      <DialogActions sx={{ mr: 2 }}>
        <Button onClick={close}>Cancel</Button>
        <Button variant={'contained'} type="submit">Guardar</Button>
      </DialogActions>
    </form>
    </Dialog >
  );
}
