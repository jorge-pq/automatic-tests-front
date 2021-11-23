import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Autocomplete } from '@mui/material';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const RoomCreateDialog = ({ open, close, save }) => {

  const [value, setValue] = React.useState([null, null]);

  const types = ["Sencilla", "Doble", "Triple"];

  const childrens = [1, 2]

  return (
    <Dialog open={open} onClose={close} maxWidth={'lg'}>
      <DialogTitle>
        {'Nueva Habitacion'}
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
        <Grid container>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} mt={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={types}
                  size={'small'}
                  // onChange={(event, room) => {
                  //     handleRoom(room);
                  // }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField fullWidth {...params} label="Tipo" />}
                />

              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Precio"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={2}>
            <Grid container>
              <Grid xs={6} mt={3} item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateRangePicker
                    startText="Check-in"
                    endText="Check-out"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} size={'small'} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} size={'small'} />
                      </React.Fragment>
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid xs={4} item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Precio"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid xs={2} mt={3} pl={3} item>
                <Button variant={'contained'}>{'Agregar oferta'}</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container justifyContent={'center'}>
              <Button variant={'contained'}>{'Agregar tipo'}</Button>
            </Grid>
          </Grid>

          {/* ------------ Childrens ------------------------- */}


          <Divider sx={{width: '100%', my: 2}}>
            <Typography sx={{position: 'relative', top: '15px'}} variant={'h6'}>
              {'Niños'}
            </Typography>
          </Divider>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} mt={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={childrens}
                  size={'small'}
                  // onChange={(event, room) => {
                  //     handleRoom(room);
                  // }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField fullWidth {...params} label="Cantidad de niños" />}
                />

              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Precio"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={2}>
            <Grid container>
              <Grid xs={6} mt={3} item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateRangePicker
                    startText="Check-in"
                    endText="Check-out"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} size={'small'} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} size={'small'} />
                      </React.Fragment>
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid xs={4} item>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Precio"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid xs={2} mt={3} pl={3} item>
                <Button variant={'contained'}>{'Agregar oferta'}</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container justifyContent={'center'}>
              <Button variant={'contained'}>{'Agregar Niño'}</Button>
            </Grid>
          </Grid>



        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cerrar</Button>
        <Button variant={'contained'} onClick={save}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomCreateDialog;