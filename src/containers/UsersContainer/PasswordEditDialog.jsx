import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

const errorText = { color: '#E8530E' };

export default function PasswordEditDialog({ open, close, save, userId }) {

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handlePassword = e => setPassword(e.target.value);
    const handleConfirm = e => setConfirm(e.target.value);

    const submit = () => {
        if (password !== confirm) {
            alert('Las contraseñas no coinciden');
        }
        else {
            if (password && confirm) {
                save({ userId: userId, password: password });
            }
            else {
                alert('Los campos son obligatorios');
            }
        }
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>{'Editar contraseña'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField type={'password'} size={'small'} fullWidth placeholder={'Contraseña nueva *'} value={password} onChange={handlePassword} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type={'password'} size={'small'} fullWidth placeholder={'Confirmar contraseña *'} value={confirm} onChange={handleConfirm} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button variant={'contained'} onClick={submit}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}
