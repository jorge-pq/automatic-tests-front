import React from 'react';
import { styled } from '@mui/material/styles';
import DatePicker from 'react-datepicker';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    height: '40px',
    padding: '2.5px 4px 2.5px 6px',
    width: '100%'
}));


const errorText = { color: '#E8530E' };

const ClientInfo = ({ birthday, setBirthday, control, errors, clientPhone, handleClientPhone, handleClient, clear }) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <TextField
                 size={'small'} 
                 value={clientPhone} 
                 onChange={handleClientPhone}
                 fullWidth 
                 label="Telefono" 
                 InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            aria-label="clear"
                            onClick={clear}
                            edge="end"
                        >
                            <ClearIcon />
                        </IconButton>
                  </InputAdornment>,
                  }}
                 endAdornment={
                    <InputAdornment position="end">
                      
                    </InputAdornment>
                  }
                 />
            </Grid>
            <Grid item xs={3}>
                <Button variant='contained' startIcon={<SearchIcon />} onClick={handleClient}>{'Buscar cliente'}</Button>
            </Grid>
            <Grid item xs={6}></Grid>
            <Divider sx={{ width: '100%', my: 2 }}/>
            <Grid item xs={3}>
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
            <Grid item xs={3}>
                 <Controller
                    control={control}
                    name="secondname"
                    render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Segundo nombre'} {...field} />}
                />
            </Grid>
            <Grid item xs={3}>
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
            <Grid item xs={3}>
                <Controller
                    control={control}
                    name="secondlastname"
                    render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Segundo apellido'} {...field} />}
                />
            </Grid>
            <Grid item xs={3}>
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
            <Grid item xs={3}>
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