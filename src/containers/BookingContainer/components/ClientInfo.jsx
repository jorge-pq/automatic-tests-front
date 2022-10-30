import React from 'react';
import { styled } from '@mui/material/styles';
import DatePicker from 'react-datepicker';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    height: '40px',
    padding: '2.5px 4px 2.5px 6px',
    width: '100%'
}));


const ClientInfo = ({ birthday, setBirthday }) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    id="name"
                    label="Nombre"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    id="name"
                    label="Segundo nombre"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    id="name"
                    label="Primer apellido"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    id="name"
                    label="Segundo apellido"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    id="name"
                    label="Telefono"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    id="name"
                    label="Correo"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
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
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    id="name"
                    label="ID"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    id="name"
                    label="Estado"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    id="name"
                    label="Ciudad"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    id="name"
                    label="Dirección"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    autoFocus
                    id="name"
                    label="Código postal"
                    type="text"
                    fullWidth
                    size='small'
                    variant="outlined"
                />
            </Grid>
        </Grid>
    );
};

export default ClientInfo;