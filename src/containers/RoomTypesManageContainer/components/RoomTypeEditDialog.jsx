import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const RoomTypeEditDialog = ({ selected, open, close, save }) => {

  const [name, setName] = useState(selected.name);
  const [description, setDescription] = useState(selected.description);
  const [persons, setPersons] = useState(selected.persons);

  const handleName = e => setName(e.target.value);
  const handleDescription = e => setDescription(e.target.value);
  const handlePerson = e => setPersons(e.target.value);

  const handleSubmit = () => {
    save({
      id: selected._id,
      name: name,
      description: description,
      persons: persons
    });
  }

  return (
    <Dialog open={open} maxWidth={'lg'}>
      <DialogTitle>
        {'Editar tipo de Habitación'}
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
        <Grid container pt={2}>
          <Stack direction={'row'} spacing={2} sx={{ width: '100%' }}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                id="name"
                label="Nombre"
                value={name}
                onChange={handleName}
                type="text"
                fullWidth
                size={'small'}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoFocus
                id="description"
                label="Descripción"
                value={description}
                onChange={handleDescription}
                type="text"
                fullWidth
                size={'small'}
                variant="outlined"
              />
            </Grid>
            <Grid xs={6}>
              <TextField
                autoFocus
                id="cost"
                size={'small'}
                label="Cant. Personas"
                type="number"
                inputProps={{ min: 1 }}
                value={persons}
                onChange={handlePerson}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Stack>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cerrar</Button>
        <Button variant={'contained'} onClick={handleSubmit}>{'Guardar'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomTypeEditDialog;