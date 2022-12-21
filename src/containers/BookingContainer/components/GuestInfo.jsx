import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import DatePicker from 'react-datepicker';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/EditOutlined';
import { Controller, useForm } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    height: '40px',
    padding: '2.5px 4px 2.5px 6px',
    width: '100%'
}));

const errorText = { color: '#E8530E' };

const GuestInfo = ({ guests, addGuest, removeGuest, totalGuests, client, birthdayClient }) => {

    const { setError, handleSubmit, formState: { errors }, clearErrors, setValue, control } = useForm();
    const [birthday, setBirthday] = useState();
    const [expireDate, setExpireDate] = useState();

    const [active, setActive] = useState(false);

    const onSubmit = (data) => {
        if(!birthday){
            setError('birthday', {}, true)
        }
        if(!expireDate){
            setError('expireDate', {}, true)
        }
        if(birthday && expireDate){
            data.birthday = new Date(birthday).toLocaleDateString();
            data.expireDate = new Date(expireDate).getFullYear() + '/' + (new Date(expireDate).getMonth()-1);
            let result = addGuest(data);
            if(result){
                clear();
            }
        }
    }

    const clear = () => {
        setValue('name', '');
        setValue('contactName', '');
        setValue('contactPhone', '');
        setValue('lastname', '');
        setValue('passport', '');
        setBirthday();
        setExpireDate();
    }

    const handleBirthday = date => {
        setBirthday(date);
        clearErrors();
    }

    const handleExpireDate = date => {
        setExpireDate(date);
        clearErrors();
    }

    const handleClient = e => {
        setActive(e.target.checked);
        if(e.target.checked){
            setValue('name', client.name + ' ' + client.secondname || '');
            setValue('lastname', client.lastname + ' ' + client.secondlastname || '');
            setBirthday(new Date(birthdayClient));
        }
        else{
            clear();
        }
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: 'inherit' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                 <b>{guests.length + 1 > totalGuests ? 'Se han insertado todos los huesped' : `Huesped ${guests.length + 1} / ${totalGuests}`}</b>
                </Grid>
                <Grid item xs={12}>
                   <FormControlLabel control={<Switch onChange={handleClient} defaultChecked={active} />} label="Agregar cliente como pasajero" />
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                    <Controller
                        control={control}
                        name="lastname"
                        rules={{ required: true }}
                        render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Apellidos *'} {...field} />}
                    />
                    {
                        errors.lastname && <label style={errorText}>{'El apellido es requerido'}</label>
                    }
                </Grid>
                <Grid item xs={4}>
                    <DatePickerCustom
                        selected={birthday}
                        onChange={(date) => handleBirthday(date)}
                        withPortal
                        isClearable={true}
                        showYearDropdown
                        placeholderText={'Fecha de nacimiento'}
                    />
                    {
                        errors.birthday && !birthday && <label style={errorText}>{'La fecha de nacimiento es requerida'}</label>
                    }
                </Grid>
                <Grid item xs={4}>
                    <Controller
                        control={control}
                        name="passport"
                        rules={{ required: true }}
                        render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Pasaporte *'} {...field} />}
                    />
                    {
                        errors.passport && <label style={errorText}>{'El pasaporte es requerido'}</label>
                    }
                </Grid>
                <Grid item xs={4}>
                    <DatePickerCustom
                        selected={expireDate}
                        onChange={(date) => handleExpireDate(date)}
                        withPortal
                        isClearable={true}
                        showMonthYearPicker
                        dateFormat="yyyy/MM"
                        placeholderText={'Vencimiento pasaporte'}
                    />
                    {
                        errors.expireDate && !expireDate && <label style={errorText}>{'La fecha de vencimiento del pasaporte es requerida'}</label>
                    }
                </Grid>
                <Divider sx={{ width: '100%', my: 2 }}>
                <Typography sx={{ position: 'relative', top: '10px' }} variant={'body1'}>
                    {'Contacto de emergencia'}
                </Typography>
            </Divider>
            <Grid item xs={4}>
                <Controller
                    control={control}
                    name="contactName"
                    render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Nombre de contacto'} {...field} />}
                />
            </Grid>
            <Grid item xs={4}>
                <Controller
                    control={control}
                    name="contactPhone"
                    render={({ field }) => <TextField size={'small'} fullWidth placeholder={'Telefono de contacto'} {...field} />}
                />
            </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent={'flex-end'}>
                        <Button type='submit' variant={'contained'} disabled={guests.length + 1 > totalGuests}>{'Agregar'}</Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper} sx={{mt: 4}}>
                    <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">{'Nombre'}</TableCell>
                                <TableCell align="center">{'Apellidos'}</TableCell>
                                <TableCell align="center">{'Fecha de nacimiento'}</TableCell>
                                <TableCell align="center">{'No. Pasaporte'}</TableCell>
                                <TableCell align="center">{'Vencimiento pasaporte'}</TableCell>
                                <TableCell align="center">{'Nombre de contacto'}</TableCell>
                                <TableCell align="center">{'Telefono de contacto'}</TableCell>
                                <TableCell align="center">{'Acciones'}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {guests.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center" scope="row">
                                        {row.lastname}
                                    </TableCell>
                                    <TableCell align="center" scope="row">
                                        {row.birthday}
                                    </TableCell>
                                    <TableCell align="center" scope="row">
                                        {row.passport}
                                    </TableCell>
                                    <TableCell align="center" scope="row">
                                        {row.expireDate}
                                    </TableCell>
                                    <TableCell align="center" scope="row">
                                        {row.contactName}
                                    </TableCell>
                                    <TableCell align="center" scope="row">
                                        {row.contactPhone}
                                    </TableCell>
                                    <TableCell align="center">
                                        {/* <IconButton>
                                            <EditIcon />
                                        </IconButton> */}
                                        <IconButton onClick={()=>removeGuest(row.passport)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </form>
    );
};

export default GuestInfo;