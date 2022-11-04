import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {getSlug} from '../../../utils/util';
import { Controller, useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const errorText = { color: '#E8530E' };

export default function HotelsEditDialog({open, close, item, save}) {

  const { handleSubmit, formState: { errors }, reset, setValue, control } = useForm();

  const onSubmit = (data) => {
    data.id = item._id,
    data.slug = getSlug(data.name)
    save(data);
  }


  return (
      <Dialog open={open} onClose={close}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: 'inherit' }}>
        <DialogTitle>{'Editar Hotel'}</DialogTitle>
        <DialogContent>
        <Grid container spacing={1}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="code"
                defaultValue={item.code}
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
                defaultValue={item.name}
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
                defaultValue={item.country}
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
                defaultValue={item.state}
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
                defaultValue={item.city}
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
                defaultValue={item.address}
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
                defaultValue={item.zipCode}
                rules={{ required: true }}
                render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Código postal *'} {...field} />}
              />
              {
                errors.zipCode && <label style={errorText}>{'El código postal es requerido'}</label>
              }
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="active"
                defaultValue={item.active}
                render={({ field }) => <FormControlLabel control={<Switch {...field} defaultChecked={item.active} />} label="Activo" />}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button variant={'contained'} type="submit">Guardar</Button>
        </DialogActions>
        </form>
      </Dialog>
  );
}
