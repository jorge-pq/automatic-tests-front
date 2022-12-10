import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Autocomplete, Stack, Switch } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import OffersChip from './OffersChip';
import TypesTable from './TypesTable';
import { styled } from '@mui/material/styles';
import DatePicker from 'react-datepicker';
import EditOffer from './EditOffer';


const DatePickerCustom = styled(DatePicker)(({ theme }) => ({
  border: '1px solid #bfbfbf',
  borderRadius: '3px',
  height: '40px',
  padding: '2.5px 4px 2.5px 6px',
  width: '100%'
}));


const TourDetailsCreateDialog = ({ id, open, close, save, types, getRoomTypePersons }) => {

  const [room, setRoom] = useState('');
  const [typeSelected, setTypeSelected] = useState('');
  const [syncPrices, setSyncPrices] = useState(false);
  const [dateOfferType, setDateOfferType] = useState([null, null]);
  const [startDateOfferType, endDateOfferType] = dateOfferType;

  const [availability, setAvailability] = useState(0);

  const [typeOfferCostAdult, setTypeOfferCostAdult] = useState(0);
  const [typeOfferCostChildren, setTypeOfferCostChildren] = useState(0);
  const [typeOfferCostInfant, setTypeOfferCostInfant] = useState(0);

  const [typeOfferPriceAdult, setTypeOfferPriceAdult] = useState(0);
  const [typeOfferPriceChildren, setTypeOfferPriceChildren,] = useState(0);
  const [typeOfferPriceInfant, setTypeOfferPriceInfant] = useState(0);

  const [typeOfferPriceRetailAdult, setTypeOfferPriceRetailAdult] = useState(0);
  const [typeOfferPriceRetailChildren, setTypeOfferPriceRetailChildren] = useState(0);
  const [typeOfferPriceRetailInfant, setTypeOfferPriceRetailInfant] = useState(0);

  const [offersType, setOffersType] = useState([]);
  const [typesAdded, setTypesAdded] = useState([]);

  const [isPeriod, setIsPeriod] = useState(false);
  const [date, setDate] = useState(new Date());

  const [openUpdateOffersDialog, setOpenUpdateOffersDialog] = useState(false);
  const [typeUpdateSelected, setTypeUpdateSelected] = useState('');


  const handleType = value => {
    setTypeSelected(value);
    // autocompletar precios con el ultimo periodo
  }

  const handleAvailability = e => setAvailability(e.target.value);

  const handleTypeOfferCostAdult = e => setTypeOfferCostAdult(e.target.value);
  const handleTypeOfferCostChildren = e => setTypeOfferCostChildren(e.target.value);
  const handleTypeOfferCostInfant = e => setTypeOfferCostInfant(e.target.value);

  const handleTypeOfferPriceAdult = e => {
    setTypeOfferPriceAdult(e.target.value);
    if(syncPrices){
      setTypeOfferPriceRetailAdult(e.target.value);
    }
  } 
  const handleTypeOfferPriceChildren = e => {
    setTypeOfferPriceChildren(e.target.value);
    if(syncPrices){
      setTypeOfferPriceRetailChildren(e.target.value);
    }
  }
  const handleTypeOfferPriceInfant = e => {
    setTypeOfferPriceInfant(e.target.value);
    if(syncPrices){
      setTypeOfferPriceRetailInfant(e.target.value);
    }
  }

  const handleTypeOfferPriceRetailAdult = e => setTypeOfferPriceRetailAdult(e.target.value);
  const handleTypeOfferPriceRetailChildren = e => setTypeOfferPriceRetailChildren(e.target.value);
  const handleTypeOfferPriceRetailInfant = e => setTypeOfferPriceRetailInfant(e.target.value);

  const addTypeToOffer = () => {
    if(isPeriod && !typeSelected){
      alert('Seleccione un tipo de habitación');
    }
    else{
      setOffersType(offersType => [...offersType, {
        // isPeriod: isPeriod,
        // period: dateOfferType,
        // date: date,
        room: isPeriod ? typeSelected : 'Sin habitación',
        costAdult: typeOfferCostAdult,
        costChildren: typeOfferCostChildren,
        costInfant: typeOfferCostInfant,
        priceAdult: typeOfferPriceAdult,
        priceChildren: typeOfferPriceChildren,
        priceInfant: typeOfferPriceInfant,
        priceRetailAdult: typeOfferPriceRetailAdult,
        priceRetailChildren: typeOfferPriceRetailChildren,
        priceRetailInfant: typeOfferPriceRetailInfant
      }]);
      setTypeSelected('');
      setTypeOfferCostAdult(0);
      setTypeOfferCostChildren(0);
      setTypeOfferCostInfant(0);
      setTypeOfferPriceAdult(0);
      setTypeOfferPriceChildren(0);
      setTypeOfferPriceInfant(0);
      setTypeOfferPriceRetailAdult(0);
      setTypeOfferPriceRetailChildren(0);
      setTypeOfferPriceRetailInfant(0);
    }
  }

  const removeTypeOffer = item => {
    setOffersType(offersType.filter(d => d != item));
  }

  const addType = () => {
    setTypesAdded(typesAdded => [...typesAdded, {
      id: typesAdded.length,
      isPeriod: isPeriod,
      period: dateOfferType,
      date: date,
      offers: offersType,
      availability: availability,
    }]);
    setTypeSelected('');
    setOffersType([]);
    setDateOfferType([null, null]);
    setAvailability(0);
    setDate();
  }


  const removeType = index => {
    setTypesAdded(typesAdded.filter(d => d.id != index));
  }

  const handleSubmit = () => {
    const data = {
      tourId: id,
      types: typesAdded
    }

    save(data);
  }

  const removeTypeOfferAdded = (offer, type) => {
    let index = typesAdded.findIndex(d => d.description == type);
    let offers = typesAdded[index].offers;
    let offersUpd = offers.filter(d => d != offer);
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

  const typesFiltered = item => {
    if (offersType.findIndex(d => d.room == item) == -1) {
      return true;
    }
    else {
      return false;
    }
  }



  return (
    <Dialog open={open} maxWidth={'lg'}>
      <DialogTitle>
        {'Nuevo tour'}
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
          <Stack direction={'row'} spacing={1} sx={{ width: '100%' }} mt={2}>
            <Grid md={2} xs={6} item>
              <FormControlLabel
                control={
                  <Switch checked={isPeriod} onChange={e => setIsPeriod(e.target.checked)} />
                }
                label="Período"
              />
            </Grid>
            {
              isPeriod ?
                <>
                  <Grid md={4} xs={6} item sx={{ marginLeft: '-8px !important' }}>
                    <DatePickerCustom
                      selectsRange={true}
                      startDate={startDateOfferType}
                      endDate={endDateOfferType}
                      onChange={(update) => {
                        setDateOfferType(update);
                      }}
                      placeholderText={'Período'}
                      withPortal
                      isClearable={true}
                    />
                  </Grid>
                  <Grid item xs={3}>
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
                </>
                :
                <Grid md={4} xs={6} item sx={{ marginLeft: '-8px !important' }}>
                  <DatePickerCustom
                    selected={date}
                    onChange={(date) => setDate(date)}
                    placeholderText={'Fecha'}
                    withPortal
                    isClearable={true}
                  />
                </Grid>
            }
            <Grid xs={6} md={3} item>
              <TextField
                autoFocus
                id="cost"
                size={'small'}
                label="Disponibilidad"
                type="number"
                inputProps={{ min: 0 }}
                value={availability}
                onChange={handleAvailability}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Stack>
          <Divider sx={{ width: '100%', my: 1 }}>
            <Typography sx={{ position: 'relative', top: '10px' }} variant={'caption'}>
              {'Costos'}
            </Typography>
          </Divider>
          <Stack direction={'row'} spacing={1} sx={{ width: '100%' }} mt={2}>
            <Grid xs={6} md={4} item>
              <TextField
                autoFocus
                id="cost"
                size={'small'}
                label="Costo adulto"
                type="number"
                inputProps={{ min: 0 }}
                value={typeOfferCostAdult}
                onChange={handleTypeOfferCostAdult}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid xs={6} md={4} item>
              <TextField
                autoFocus
                id="cost"
                size={'small'}
                label="Costo niño"
                type="number"
                inputProps={{ min: 0 }}
                value={typeOfferCostChildren}
                onChange={handleTypeOfferCostChildren}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid xs={6} md={4} item>
              <TextField
                autoFocus
                id="cost"
                size={'small'}
                label="Costo infante"
                type="number"
                inputProps={{ min: 0 }}
                value={typeOfferCostInfant}
                onChange={handleTypeOfferCostInfant}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Stack>
          <Divider sx={{ width: '100%', my: 1 }}>
            <Typography sx={{ position: 'relative', top: '10px' }} variant={'caption'}>
              {'Precios públicos'}
            </Typography>
          </Divider>
          <Stack direction={'row'} spacing={1} sx={{ width: '100%' }} mt={2}>
            <Grid md={4} xs={6} item pl={1}>
              <TextField
                autoFocus
                id="name"
                label="Precio adulto"
                inputProps={{ min: 0 }}
                type="number"
                size={'small'}
                value={typeOfferPriceAdult}
                onChange={handleTypeOfferPriceAdult}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid md={4} xs={6} item pl={1}>
              <TextField
                autoFocus
                id="name"
                label="Precio niño"
                inputProps={{ min: 0 }}
                type="number"
                size={'small'}
                value={typeOfferPriceChildren}
                onChange={handleTypeOfferPriceChildren}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid md={4} xs={6} item pl={1}>
              <TextField
                autoFocus
                id="name"
                label="Precio infante"
                inputProps={{ min: 0 }}
                type="number"
                size={'small'}
                value={typeOfferPriceInfant}
                onChange={handleTypeOfferPriceInfant}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Stack>
          <Divider sx={{ width: '100%', my: 1 }}>
            <Typography sx={{ position: 'relative', top: '10px' }} variant={'caption'}>
              {'Precios minoristas'}
            </Typography>
          </Divider>
          <Stack direction={'row'} spacing={1} sx={{ width: '100%' }} mt={2}>
            <Grid md={4} xs={6} item pl={1}>
              <TextField
                autoFocus
                id="name"
                label="Precio adulto"
                inputProps={{ min: 0 }}
                type="number"
                size={'small'}
                value={typeOfferPriceRetailAdult}
                onChange={handleTypeOfferPriceRetailAdult}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid md={4} xs={6} item pl={1}>
              <TextField
                autoFocus
                id="name"
                label="Precio niño"
                inputProps={{ min: 0 }}
                type="number"
                size={'small'}
                value={typeOfferPriceRetailChildren}
                onChange={handleTypeOfferPriceRetailChildren}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid md={4} xs={6} item pl={1}>
              <TextField
                autoFocus
                id="name"
                label="Precio infante"
                inputProps={{ min: 0 }}
                type="number"
                size={'small'}
                value={typeOfferPriceRetailInfant}
                onChange={handleTypeOfferPriceRetailInfant}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Stack>
          <Stack direction={'row'} spacing={1} sx={{ width: '100%' }} mt={2} justifyContent={'space-between'}>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch checked={syncPrices} onChange={e => setSyncPrices(e.target.checked)} />
                }
                label="Sincronizar precios públicos y minoristas"
              />
            </Grid>
            <Grid item>
              <Button variant={'contained'} onClick={addTypeToOffer}>{'Agregar precio'}</Button>
            </Grid>
          </Stack>
          <Grid item xs={12} mt={2}>
            <OffersChip data={offersType} handleDeleteOffer={removeTypeOffer} />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container justifyContent={'center'}>
              <Button variant={'contained'} disabled={offersType.length === 0} onClick={addType}>{'Agregar oferta'}</Button>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <TypesTable data={typesAdded} removeType={removeType} removeTypeOfferAdded={removeTypeOfferAdded} editOffersToType={editOffersToType} />
          </Grid>

        </Grid>
        <EditOffer open={openUpdateOffersDialog} close={() => setOpenUpdateOffersDialog(false)} type={typeUpdateSelected} updateTypeOffers={updateTypeOffers} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cerrar</Button>
        <Button variant={'contained'} disabled={typesAdded.length < 1} onClick={handleSubmit}>{'Guardar ofertas'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TourDetailsCreateDialog;