import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';


export default function SaveUrlTestDialog({ open, close, save, apps }) {

    const [app, setApp] = useState();
    const [description, setDescription] = useState('');


    const handleDescription = e => setDescription(e.target.value);
    const handleApp = value => setApp(value);

    const onSubmit = () => {
        save({ description: description, app: app._id });
    }

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>{'Guardar url'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={1} pt={2}>
                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={apps}
                            size={'small'}
                            value={app}
                            onChange={(event, op) => handleApp(op)}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField fullWidth {...params} label="Applications" />} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField size={'small'} onChange={handleDescription} fullWidth placeholder={'Description *'} value={description} />
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
