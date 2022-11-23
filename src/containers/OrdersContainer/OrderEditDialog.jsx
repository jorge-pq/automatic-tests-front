import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const OrderEditDialog = ({booking, open, close, save }) => {

    return (
        <Dialog open={open} maxWidth={'lg'}>
        <DialogTitle>
          {'Editar orden'}
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
            {booking.code}
        </DialogContent>
      <DialogActions>
        <Button onClick={close}>{'Cerrar'}</Button>
        <Button>{'Actualizar'}</Button>
      </DialogActions>
    </Dialog>
    );
};

export default OrderEditDialog;