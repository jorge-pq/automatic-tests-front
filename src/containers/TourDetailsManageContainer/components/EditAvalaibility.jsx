import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EditAvalaibility = ({ open, close, selected, updateAvalaibility }) => {

    const [value, setValue] = useState(0);

    const handleValue = e => {
        setValue(e.target.value);
    }

    useEffect(() => {
        setValue(selected.availability);
        return () => {
            setValue(0);
        };
    }, [selected.id]);

    const save = () => {
        updateAvalaibility(value, selected.id);
    }

    return (
        <Dialog open={open}>
            <DialogTitle>
                {'Editar disponibilidad'}
                <IconButton
                    aria-label="close"
                    onClick={close}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField
                    sx={{ width: '250px', mt: 2 }}
                    inputProps={{ min: 0 }}
                    type="number"
                    size={'small'}
                    value={value}
                    onChange={handleValue}
                    label="Disponibilidad"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cerrar</Button>
                <Button variant={'contained'} onClick={save}>{'Guardar'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditAvalaibility;