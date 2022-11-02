import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getSlug } from '../../../utils/util';

export default function HotelsCreateDialog({ open, close, save }) {

  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const handleName = e => setName(e.target.value);
  const handleCode = e => setCode(e.target.value);

  const handleSubmit = () => {
    const data = {
      code: code,
      name: name,
      slug: getSlug(name)
    }
    save(data);
  }

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{'Nuevo Hotel'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="code"
          label="Código"
          value={code}
          onChange={handleCode}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre"
          value={name}
          onChange={handleName}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button variant={'contained'} onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
