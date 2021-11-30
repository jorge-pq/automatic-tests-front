import React, { useState, useEffect } from 'react';
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
import OffersChip from './OffersChip';
import TypesTable from './TypesTable';
import ChildrensTable from './ChildrensTable';


const types = ["Sencilla", "Doble", "Triple"];
const childrens = [1, 2];

const RoomEditDialog = ({selected, id, open, close, save }) => {

  const [roomOld, setRoomOld] = useState('');
  const [room, setRoom] = useState('');
  const [typeSelected, setTypeSelected] = useState('');
  const [typePrice, setTypePrice] = useState();
  const [dateOfferType, setDateOfferType] = useState([null, null]);
  const [typeOfferPrice, setTypeOfferPrice] = useState();
  const [offersType, setOffersType] = useState([]);
  const [typesAdded, setTypesAdded] = useState([]);

  const [childrensSelected, setChildrensSelected] = useState('');
  const [childrenPrice, setChildrenPrice] = useState();
  const [dateOfferChildren, setDateOfferChildren] = useState([null, null]);
  const [childrenOfferPrice, setChildrenOfferPrice] = useState();
  const [offersChildren, setOffersChildren] = useState([]);
  const [childrensAdded, setChildrensAdded] = useState([]);

  const handleRoom = e => {
    setRoom(e.target.value);
  }
  const handleType = value => {
    setTypeSelected(value);
  }
  const handleTypePrice = e => setTypePrice(e.target.value);
  const handleTypeOfferPrice = e => setTypeOfferPrice(e.target.value);


  useEffect(() => {
    setRoomOld(selected.name);
    setRoom(selected.name);
    setTypesAdded(selected.types);
    setChildrensAdded(selected.childrens);
    return () => {
      setRoom('');
      setRoomOld('');
      setTypesAdded([]);
      setChildrensAdded([]);
    };
  }, [selected]);


  const addOfferToType = () => {
    setOffersType(offersType => [...offersType, {
      date: dateOfferType,
      price: typeOfferPrice,
    }]);
  }

  const removeTypeOffer = item => {
    setOffersType(offersType.filter(d => d != item));
  }

  const addType = () => {
    setTypesAdded(typesAdded => [...typesAdded, {
      description: typeSelected,
      price: typePrice,
      offers: offersType
    }]);

    setOffersType([]);
    setTypeOfferPrice(0);
    setDateOfferType([null, null]);
  }
  const removeType = item => {
    setTypesAdded(typesAdded.filter(d => d.description != item));
  }

  const handleChildrens = value => {
    setChildrensSelected(value);
  }
  const handleChildrenPrice = e => setChildrenPrice(e.target.value);
  const handleChildrenOfferPrice = e => setChildrenOfferPrice(e.target.value);

  const addOfferToChildren = () => {
    setOffersChildren(offersChildren => [...offersChildren, {
      date: dateOfferChildren,
      price: childrenOfferPrice,
    }]);
  }

  const removeChildrenOffer = item => {
    setOffersChildren(offersChildren.filter(d => d != item));
  }

  const addChildren = () => {
    setChildrensAdded(childrensAdded => [...childrensAdded, {
      count: childrensSelected,
      price: childrenPrice,
      offers: offersChildren
    }]);

    setOffersChildren([]);
    setChildrenOfferPrice(0);
    setDateOfferChildren([null, null]);
  }

  const removeChildren = item => {
    setChildrensAdded(childrensAdded.filter(d => d.count != item));
  }

  const handleSubmit = () => {
      const data = {
        hotelId: id,
        roomOld: roomOld,
        name: room,
        types: typesAdded,
        childrens: childrensAdded
      }

      save(data);
  }

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
              value={room}
              onChange={handleRoom}
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
                  value={typeSelected}
                  onChange={(event, type) => {
                    handleType(type);
                  }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField fullWidth {...params} label="Tipo" />}
                />

              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Precio standard"
                  type="number"
                  value={typePrice}
                  onChange={handleTypePrice}
                  inputProps={{ min: 0 }}
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
                    startText="Desde"
                    endText="Hasta"
                    inputFormat={'dd/MM/yyyy'}
                    value={dateOfferType}
                    onChange={(newValue) => {
                      setDateOfferType(newValue);
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
                  label="Precio oferta"
                  inputProps={{ min: 0 }}
                  type="number"
                  value={typeOfferPrice}
                  onChange={handleTypeOfferPrice}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid xs={2} mt={3} pl={3} item>
                <Button variant={'contained'} onClick={addOfferToType}>{'Agregar oferta'}</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <OffersChip data={offersType} handleDeleteOffer={removeTypeOffer} />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container justifyContent={'center'}>
              <Button variant={'contained'} onClick={addType}>{'Agregar tipo'}</Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <TypesTable data={typesAdded} removeType={removeType} />
          </Grid>

          {/* ------------ Childrens ------------------------- */}


          <Divider sx={{ width: '100%', my: 2 }}>
            <Typography sx={{ position: 'relative', top: '15px' }} variant={'h6'}>
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
                  value={childrensSelected}
                  onChange={(event, count) => {
                    handleChildrens(count);
                  }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField fullWidth {...params} label="Cantidad de niños" />}
                />

              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Precio standard"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={childrenPrice}
                  onChange={handleChildrenPrice}
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
                    startText="Desde"
                    endText="Hasta"
                    inputFormat={'dd/MM/yyyy'}
                    value={dateOfferChildren}
                    onChange={(newValue) => {
                      setDateOfferChildren(newValue);
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
                  label="Precio oferta"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={childrenOfferPrice}
                  onChange={handleChildrenOfferPrice}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid xs={2} mt={3} pl={3} item>
                <Button variant={'contained'} onClick={addOfferToChildren}>{'Agregar oferta'}</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <OffersChip data={offersChildren} handleDeleteOffer={removeChildrenOffer} />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container justifyContent={'center'}>
              <Button variant={'contained'} onClick={addChildren}>{'Agregar Niño'}</Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <ChildrensTable data={childrensAdded} removeChildren={removeChildren} />
          </Grid>


        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cerrar</Button>
        <Button variant={'contained'} disabled={!room || typesAdded.length<1} onClick={handleSubmit}>{'Guardar habitacion'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomEditDialog;