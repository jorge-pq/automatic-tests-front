import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';


export default function AddApplicationDialog({ open, close, save }) {

    const [code, setCode] = useState();
    const [name, setName] = useState('');


    const handleName = e => setName(e.target.value);
    const handleCode = e => setCode(e.target.value);

    const onSubmit = () => {
        save({ name: name, code: code });
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>{'Nueva aplicacion'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} pt={2}>
                    <Grid item xs={12}>
                        <TextField size={'small'} onChange={handleCode} fullWidth placeholder={'Código *'} value={code} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField size={'small'} onChange={handleName} fullWidth placeholder={'Nombre *'} value={name} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ mr: 2 }}>
                <Button onClick={close}>Cancel</Button>
                <Button variant={'contained'} onClick={onSubmit}>Guardar</Button>
            </DialogActions>
        </Dialog >
    );
}
