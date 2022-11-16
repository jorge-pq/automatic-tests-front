import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import OffersChip from './OffersChip';
import TypesTable from './TypesTable';
import ChildrensTable from './ChildrensTable';
import DatePickerCustom from '../../../components/DatePickerCustom';
import EditOffer from './EditOffer';


const types = ["Sencilla", "Doble", "Triple"];
const childrens = [1, 2];

const RoomEditDialog = ({selected, id, open, close, save }) => {

  const [roomOld, setRoomOld] = useState('');
  const [room, setRoom] = useState('');
  const [typeSelected, setTypeSelected] = useState('');
  const [typePrice, setTypePrice] = useState();
  const [dateOfferType, setDateOfferType] = useState([null, null]);
  const [startDateOfferType, endDateOfferType] = dateOfferType;
  const [typeOfferCost, setTypeOfferCost] = useState();
  const [typeOfferPrice, setTypeOfferPrice] = useState();
  const [typeOfferPriceRetail, setTypeOfferPriceRetail] = useState();
  const [offersType, setOffersType] = useState([]);
  const [typesAdded, setTypesAdded] = useState([]);

  const [childrensSelected, setChildrensSelected] = useState('');
  const [childrenPrice, setChildrenPrice] = useState();
  const [dateOfferChildren, setDateOfferChildren] = useState([null, null]);
  const [startDateOfferChildren, endDateOfferTChildren] = dateOfferChildren;
  const [childrenOfferCost, setChildrenOfferCost] = useState();
  const [childrenOfferPrice, setChildrenOfferPrice] = useState();
  const [childrenOfferPriceRetail, setChildrenOfferPriceRetail] = useState();
  const [offersChildren, setOffersChildren] = useState([]);
  const [childrensAdded, setChildrensAdded] = useState([]);

  const [openUpdateOffersDialog, setOpenUpdateOffersDialog] = useState(false);
  const [typeUpdateSelected, setTypeUpdateSelected] = useState('');
  const [openUpdateOffersChildrenDialog, setOpenUpdateOffersChildrenDialog] = useState(false);
  const [childrenUpdateSelected, setChildrenUpdateSelected] = useState('');

  const handleRoom = e => {
    setRoom(e.target.value);
  }
  const handleType = value => {
    setTypeSelected(value);
  }
  const handleTypeOfferCost = e => setTypeOfferCost(e.target.value);
  const handleTypeOfferPrice = e => setTypeOfferPrice(e.target.value);
  const handleTypeOfferPriceRetail = e => setTypeOfferPriceRetail(e.target.value);

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
      cost: typeOfferCost,
      price: typeOfferPrice,
      priceRetail: typeOfferPriceRetail
    }]);

    setTypeOfferPrice(0);
    setTypeOfferPriceRetail(0);
    setDateOfferType([null, null]);
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

    setTypeSelected('');  
    setOffersType([]);
  }

  const removeType = item => {
    setTypesAdded(typesAdded.filter(d => d.description != item));
  }

  const handleChildrens = value => {
    setChildrensSelected(value);
  }
  const handleChildrenOfferCost = e => setChildrenOfferCost(e.target.value);
  const handleChildrenOfferPrice = e => setChildrenOfferPrice(e.target.value);
  const handleChildrenOfferPriceRetail = e => setChildrenOfferPriceRetail(e.target.value);


  const addOfferToChildren = () => {
    setOffersChildren(offersChildren => [...offersChildren, {
      date: dateOfferChildren,
      cost: childrenOfferCost,
      price: childrenOfferPrice,
      priceRetail: childrenOfferPriceRetail
    }]);

    setChildrenOfferPrice(0);
    setChildrenOfferPriceRetail(0);
    setDateOfferChildren([null, null]);
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

    setChildrensSelected('');
    setOffersChildren([]);
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

  const removeTypeOfferAdded = (offer, type) => {
    let index = typesAdded.findIndex(d => d.description == type);
    let offers = typesAdded[index].offers;
    let offersUpd = offers.filter(d=>d!=offer); 
    let upd = [...typesAdded];
    upd[index].offers = offersUpd;
    setTypesAdded(upd);
  }

  const editOffersToType = value => {
    setOpenUpdateOffersDialog(true);
    setTypeUpdateSelected(value);
  }

  const updateTypeOffers = (offer, type) => {
    let index = typesAdded.findIndex(d => d.description == type);
    let upd = [...typesAdded];
    upd[index].offers.push(offer);
    setTypesAdded(upd);
    setOpenUpdateOffersDialog(false);
    setTypeUpdateSelected('');
  }
  
  const editOffersToChildren = value => {
    setOpenUpdateOffersChildrenDialog(true);
    setChildrenUpdateSelected(value);
  }

  const updateChildrenOffers = (offer, type) => {
    let index = childrensAdded.findIndex(d => d.count == type);
    let upd = [...childrensAdded];
    upd[index].offers.push(offer);
    setChildrensAdded(upd);
    setOpenUpdateOffersChildrenDialog(false);
    setChildrenUpdateSelected('');
  }

  const typesFiltered = item => {
    if(typesAdded.findIndex(d=>d.description == item)== -1){
      return true;
    }
    else{
      return false;
    }
  }

  const childrenFiltered = item => {
    if(childrensAdded.findIndex(d=>d.count == item)== -1){
      return true;
    }
    else{
      return false;
    }
  }

  return (
    <Dialog open={open} maxWidth={'lg'}>
      <DialogTitle>
        {'Editar Habitacion'}
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
          <Stack direction={'row'} spacing={2} sx={{width: '100%'}}>
          <Grid item xs={6}>
              <TextField
                autoFocus
                id="name"
                label="Nombre"
                value={room}
                onChange={handleRoom}
                type="text"
                fullWidth
                size={'small'}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={types.filter(typesFiltered)}
                size={'small'}
                value={typeSelected}
                onChange={(event, type) => {
                  handleType(type);
                }}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField fullWidth {...params} label="Tipo" />}
              />
            </Grid>
          </Stack>
          <Stack direction={'row'} spacing={1} sx={{ width: '100%' }} mt={2}>
            <Grid md={4} xs={6} item>
              <DatePickerCustom
                selectsRange={true}
                startDate={startDateOfferType}
                endDate={endDateOfferType}
                onChange={(update) => {
                  setDateOfferType(update);
                }}
                placeholderText={'Fecha'}
                withPortal
                isClearable={true}
              />
            </Grid>
            <Grid xs={6} md={2} item>
              <TextField
                autoFocus
                id="cost"
                size={'small'}
                label="Costo"
                type="number"
                inputProps={{ min: 0 }}
                value={typeOfferCost}
                onChange={handleTypeOfferCost}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid md={2} xs={6} item pl={1}>
              <TextField
                autoFocus
                id="name"
                label="Precio mayorista"
                inputProps={{ min: 0 }}
                type="number"
                size={'small'}
                value={typeOfferPrice}
                onChange={handleTypeOfferPrice}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid md={2} xs={6} item pl={1}>
              <TextField
                autoFocus
                id="name"
                label="Precio minorista"
                inputProps={{ min: 0 }}
                type="number"
                size={'small'}
                value={typeOfferPriceRetail}
                onChange={handleTypeOfferPriceRetail}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid xs={6} md={2} mt={3} item>
              <Button variant={'contained'} onClick={addOfferToType}>{'Agregar oferta'}</Button>
            </Grid>
          </Stack>

          <Grid item xs={12} mt={2}>
            <OffersChip data={offersType} handleDeleteOffer={removeTypeOffer} />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container justifyContent={'center'}>
              <Button variant={'contained'} disabled={offersType.length===0} onClick={addType}>{'Agregar tipo habitación'}</Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <TypesTable data={typesAdded} removeType={removeType} removeTypeOfferAdded={removeTypeOfferAdded} editOffersToType={editOffersToType} />
          </Grid>

          {/* ------------ Childrens ------------------------- */}


          <Divider sx={{ width: '100%', my: 2 }}>
            <Typography sx={{ position: 'relative', top: '15px' }} variant={'h6'}>
              {'Niños'}
            </Typography>
          </Divider>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={2} mt={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={childrens.filter(childrenFiltered)}
                  size={'small'}
                  value={childrensSelected}
                  onChange={(event, count) => {
                    handleChildrens(count);
                  }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField fullWidth {...params} label="Cantidad de niños" />}
                />
              </Grid>

               <Grid item xs={6} md={2} mt={2}>
                <DatePickerCustom
                  selectsRange={true}
                  startDate={startDateOfferChildren}
                  endDate={endDateOfferTChildren}
                  onChange={(update) => {
                    setDateOfferChildren(update);
                  }}
                  placeholderText={'Fecha'}
                  withPortal
                  isClearable={true}
                />
              </Grid>
              <Grid xs={6} md={2} item mt={2}>
                <TextField
                  autoFocus
                  id="cost"
                  size={'small'}
                  label="Costo"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={childrenOfferCost}
                  onChange={handleChildrenOfferCost}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid xs={6} md={2} item mt={2}>
                <TextField
                  autoFocus
                  id="name"
                  size={'small'}
                  label="Precio mayorista"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={childrenOfferPrice}
                  onChange={handleChildrenOfferPrice}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid xs={6} md={2} item mt={2}>
                <TextField
                  autoFocus
                  id="name"
                  size={'small'}
                  label="Precio minorista"
                  type="number"
                  inputProps={{ min: 0 }}
                  value={childrenOfferPriceRetail}
                  onChange={handleChildrenOfferPriceRetail}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid xs={12} md={2} mt={2} pl={3} item>
                <Button variant={'contained'} onClick={addOfferToChildren}>{'Agregar oferta'}</Button>
              </Grid>
            </Grid>
          </Grid>


          <Grid item xs={12} mt={2}>
            <OffersChip data={offersChildren} handleDeleteOffer={removeChildrenOffer} />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container justifyContent={'center'}>
              <Button variant={'contained'} disabled={offersChildren.length===0} onClick={addChildren}>{'Agregar Niño'}</Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <ChildrensTable data={childrensAdded} removeChildren={removeChildren} editOffersToChildren={editOffersToChildren} />
          </Grid>
        </Grid>
        <EditOffer open={openUpdateOffersDialog} close={()=>setOpenUpdateOffersDialog(false)} type={typeUpdateSelected} updateTypeOffers={updateTypeOffers} />
        <EditOffer open={openUpdateOffersChildrenDialog} close={()=>setOpenUpdateOffersChildrenDialog(false)} type={childrenUpdateSelected} children updateTypeOffers={updateChildrenOffers} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cerrar</Button>
        <Button variant={'contained'} disabled={!room || typesAdded.length<1} onClick={handleSubmit}>{'Guardar habitacion'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoomEditDialog;