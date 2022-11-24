import React from 'react';
import { styled } from '@mui/material/styles';
import DatePicker from 'react-datepicker';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    height: '40px',
    padding: '2.5px 4px 2.5px 6px',
    width: '100%'
}));


const errorText = { color: '#E8530E' };

const ClientInfo = ({ client, birthday, setBirthday, control, errors }) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Controller
                    control={control}
                    name="name"
                    defaultValue={client.name}
                    rules={{ required: true }}
                    render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Nombre *'} {...field} />}
                />
                {
                    errors.name && <label style={errorText}>{'El nombre es requerido'}</label>
                }
            </Grid>
            <Grid item xs={3}>
                 <Controller
                    control={control}
                    name="secondname"
                    defaultValue={client.secondname}
                    render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Segundo nombre'} {...field} />}
                />
            </Grid>
            <Grid item xs={3}>
                <Controller
                    control={control}
                    name="lastname"
                    defaultValue={client.lastname}
                    rules={{ required: true }}
                    render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Primer apellido *'} {...field} />}
                />
                {
                    errors.lastname && <label style={errorText}>{'El primer apellido es requerido'}</label>
                }
            </Grid>
            <Grid item xs={3}>
                <Controller
                    control={control}
                    name="secondlastname"
                    defaultValue={client.secondlastname}
                    render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Segundo apellido'} {...field} />}
                />
            </Grid>
            <Grid item xs={3}>
                <Controller
                    control={control}
                    name="phone"
                    defaultValue={client.phone}
                    rules={{ required: true }}
                    render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Telefono *'} {...field} />}
                />
                {
                    errors.phone && <label style={errorText}>{'El Telefono es requerido'}</label>
                }
            </Grid>
            <Grid item xs={3}>
                <Controller
                    control={control}
                    name="email"
                    defaultValue={client.email}
                    rules={{ required: true }}
                    render={({ field }) => <TextField size={'small'} type={'email'} fullWidth placeholder={'Correo *'} {...field} />}
                />
                {
                    errors.email && <label style={errorText}>{'El correo es requerido'}</label>
                }
            </Grid>
            <Grid item xs={3}>
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
            <Grid item xs={3}>
                  <Controller
                    control={control}
                    name="clientID"
                    defaultValue={client.clientID}
                    rules={{ required: true }}
                    render={({ field }) => <TextField size={'small'} type={'text'} fullWidth placeholder={'ID *'} {...field} />}
                />
                {
                    errors.clientID && <label style={errorText}>{'El ID es requerido'}</label>
                }
            </Grid>
            <Grid item xs={3}>
                <Controller
                    control={control}
                    name="state"
                    defaultValue={client.state}
                    rules={{ required: true }}
                    render={({ field }) => <TextField size={'small'} type={'text'} fullWidth placeholder={'Estado *'} {...field} />}
                />
                {
                    errors.state && <label style={errorText}>{'El Estado es requerido'}</label>
                }
            </Grid>
            <Grid item xs={3}>
                <Controller
                    control={control}
                    name="city"
                    defaultValue={client.city}
                    rules={{ required: true }}
                    render={({ field }) => <TextField size={'small'} type={'text'} fullWidth placeholder={'Ciudad *'} {...field} />}
                />
                {
                    errors.city && <label style={errorText}>{'La Ciudad es requerida'}</label>
                }
            </Grid>
            <Grid item xs={3}>
                 <Controller
                    control={control}
                    name="address"
                    defaultValue={client.address}
                    rules={{ required: true }}
                    render={({ field }) => <TextField size={'small'} type={'text'} fullWidth placeholder={'Dirección *'} {...field} />}
                />
                {
                    errors.address && <label style={errorText}>{'La Dirección es requerida'}</label>
                }
            </Grid>
            <Grid item xs={3}>
                 <Controller
                    control={control}
                    name="zipcode"
                    defaultValue={client.zipcode}
                    rules={{ required: true }}
                    render={({ field }) => <TextField size={'small'} type={'text'} fullWidth placeholder={'Código postal *'} {...field} />}
                />
                {
                    errors.zipcode && <label style={errorText}>{'El código postal es requerido'}</label>
                }
            </Grid>
        </Grid>
    );
};

export default ClientInfo;