import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { Controller, useForm } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const errorText = { color: '#E8530E' };

export default function PasswordEditDialog({ open, close, save, user }) {

    const { handleSubmit, formState: { errors }, control, setValue } = useForm();

    useEffect(() => {
        setValue("fullname", user.fullname);
        setValue("phone", user.phone);
        setValue("userRole", user.role);
        return () => {
            setValue("fullname", '');
            setValue("phone", '');
            setValue("userRole", '');
        };
    }, [user]);

    const onSubmit = (data) => {
        data.id = user._id;
        data.phone = String(data.phone).replace(/[{()}-]/g, '');
        save(data);
    }

    return (
        <Dialog open={open} onClose={close}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: 'inherit' }}>
                <DialogTitle>{'Editar usuario'}</DialogTitle>
                <DialogContent>

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
                                    name="userRole"
                                    rules={{ required: true }}
                                    render={({ field }) =>
                                        <FormControl sx={{ minWidth: 120 }} fullWidth size="small">
                                            <InputLabel id="demo-select-small">{'Role'}</InputLabel>
                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                {...field}
                                                label="Rol"
                                            >
                                                <MenuItem value={'administrator'}>{'Administrador'}</MenuItem>
                                                <MenuItem value={'employee'}>{'Empleado'}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    }
                                />
                                {
                                    errors.phone && <label style={errorText}>{'El rol es requerido'}</label>
                                }
                            </Grid>
                            <Grid item md={7} xs={11}>
                                <Controller
                                    control={control}
                                    name="active"
                                    defaultValue={user.active}
                                    render={({ field }) => <FormControlLabel control={<Switch {...field} defaultChecked={user.active} />} label="Activo" />}
                                /></Grid>
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
