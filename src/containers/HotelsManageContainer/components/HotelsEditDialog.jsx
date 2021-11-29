import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {getSlug} from '../../../utils/util';

export default function HotelsEditDialog({open, close, item, save}) {

  const [name, setName] = useState('');

  const handleName = e => setName(e.target.value);

  const handleSubmit = () => {
    const data = {
      id: item._id,
      name: name,
      slug: getSlug(name)
    }

    save(data);
  }

  useEffect(() => {
    setName(item.name);
    return () => {
      setName('');
    };
  }, [item]);

  return (
      <Dialog open={open} onClose={close}>
        <DialogTitle>{'Editar Hotel'}</DialogTitle>
        <DialogContent>
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
