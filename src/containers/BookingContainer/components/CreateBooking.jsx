import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import DatePicker from 'react-datepicker';
import { styled } from '@mui/material/styles';

const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    height: '40px',
    padding: '2.5px 4px 2.5px 6px',
    width: '100%'
}));


const CreateBooking = ({ open, close, save }) => {

    const [birthday, setBirthday] = useState();
    const [expireDate, setExpireDate] = useState();

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Reservación</DialogTitle>
            <DialogContent>
                <Grid container pt={2}>
                    <Stack direction={'row'} spacing={2} sx={{width: 'inherit'}}>
                        <TextField
                            autoFocus
                            id="name"
                            label="Nombre"
                            type="text"
                            fullWidth
                            size='small'
                            variant="outlined"
                        />
                        <TextField
                            autoFocus
                            id="name"
                            label="Apellidos"
                            type="text"
                            fullWidth
                            size='small'
                            variant="outlined"
                        />
                    </Stack>
                    <Stack direction={'row'} spacing={2} mt={2} sx={{width: 'inherit'}}>
                        <TextField
                            autoFocus
                            id="name"
                            label="Telefono"
                            type="text"
                            fullWidth
                            size='small'
                            variant="outlined"
                        />
                        <TextField
                            autoFocus
                            id="name"
                            label="Correo"
                            type="text"
                            fullWidth
                            size='small'
                            variant="outlined"
                        />
                    </Stack>
                    <Stack direction={'row'} spacing={2} mt={2} sx={{width: 'inherit'}}>
                        <DatePickerCustom
                            selected={birthday}
                            onChange={(date) => setBirthday(date)}
                            withPortal
                            isClearable={true}
                            showYearDropdown
                            placeholderText={'Fecha de nacimiento'}
                        />
                        <TextField
                            autoFocus
                            id="name"
                            label="No. Pasaporte"
                            type="text"
                            size='small'
                            variant="outlined"
                        />
                         <DatePickerCustom
                            selected={expireDate}
                            onChange={(date) => setExpireDate(date)}
                            withPortal
                            isClearable={true}
                            showMonthYearPicker
                            dateFormat="yyyy/MM"
                            placeholderText={'Vencimiento pasaporte'}
                        />
                    </Stack>
                </Grid>
            </DialogContent>
            <DialogActions sx={{pr: 3}}>
                <Button onClick={close}>{'Cancelar'}</Button>
                <Button onClick={save} variant={'contained'}>{'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateBooking;