import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getSlug } from '../../../utils/util';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';


const errorText = { color: '#E8530E' };


export default function TourCreateDialog({ open, close, save }) {

  const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm();

  const onSubmit = (data) => {
    data.slug = getSlug(data.name)
    save(data);
  }

  return (
    <Dialog open={open} onClose={close}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: 'inherit' }}>
        <DialogTitle>{'Nuevo tour'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="code"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Código *'} {...field} />}
              />
              {
                errors.code && <label style={errorText}>{'El código es requerido'}</label>
              }
            </Grid>
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
                name="country"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'País *'} {...field} />}
              />
              {
                errors.country && <label style={errorText}>{'El país es requerido'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="state"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Estado *'} {...field} />}
              />
              {
                errors.state && <label style={errorText}>{'El estado es requerido'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="city"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Ciudad *'} {...field} />}
              />
              {
                errors.city && <label style={errorText}>{'La ciudad es requerida'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="address"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Dirección *'} {...field} />}
              />
              {
                errors.address && <label style={errorText}>{'La dirección es requerida'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="zipCode"
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Código postal *'} {...field} />}
              />
              {
                errors.zipCode && <label style={errorText}>{'El código postal es requerido'}</label>
              }
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{mr: 2}}>
          <Button onClick={close}>Cancel</Button>
          <Button variant={'contained'} type="submit">Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
