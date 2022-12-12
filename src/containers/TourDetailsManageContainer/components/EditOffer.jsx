import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, Switch, Autocomplete } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


const EditOffer = ({ open, close, selected, updateTypeOffers, typesAdded, types, offersType }) => {

   const [typeSelected, setTypeSelected] = useState('');
   const [syncPrices, setSyncPrices] = useState(true);
    const [typeOfferCostAdult, setTypeOfferCostAdult] = useState(0);
    const [typeOfferCostChildren, setTypeOfferCostChildren] = useState(0);
    const [typeOfferCostInfant, setTypeOfferCostInfant] = useState(0);
  
    const [typeOfferPriceAdult, setTypeOfferPriceAdult] = useState(0);
    const [typeOfferPriceChildren, setTypeOfferPriceChildren,] = useState(0);
    const [typeOfferPriceInfant, setTypeOfferPriceInfant] = useState(0);
  
    const [typeOfferPriceRetailAdult, setTypeOfferPriceRetailAdult] = useState(0);
    const [typeOfferPriceRetailChildren, setTypeOfferPriceRetailChildren] = useState(0);
    const [typeOfferPriceRetailInfant, setTypeOfferPriceRetailInfant] = useState(0);

    const handleType = value => {
      setTypeSelected(value);
      if(typesAdded.length>0){
          let last = typesAdded[typesAdded.length - 1];
          let offer = last.offers.find(d=>d.room===value);
          if(offer){
            setTypeOfferCostAdult(offer.costAdult);
            setTypeOfferCostChildren(offer.costChildren);
            setTypeOfferCostInfant(offer.costInfant);
            setTypeOfferPriceAdult(offer.priceAdult);
            setTypeOfferPriceChildren(offer.priceChildren);
            setTypeOfferPriceInfant(offer.priceInfant);
            setTypeOfferPriceRetailAdult(offer.priceRetailAdult);
            setTypeOfferPriceRetailChildren(offer.priceRetailChildren);
            setTypeOfferPriceRetailInfant(offer.priceRetailInfant);
          }
      }
    }

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

  const save = () => {
    const upd = {
      room: typeSelected,
      costAdult: typeOfferCostAdult,
      costChildren: typeOfferCostChildren,
      costInfant: typeOfferCostInfant,
      priceAdult: typeOfferPriceAdult,
      priceChildren: typeOfferPriceChildren,
      priceInfant: typeOfferPriceInfant,
      priceRetailAdult: typeOfferPriceRetailAdult,
      priceRetailChildren: typeOfferPriceRetailChildren,
      priceRetailInfant: typeOfferPriceRetailInfant
    };
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
    updateTypeOffers(upd, selected);

  }

    const typesFiltered = item => {
      let offers = typesAdded.find(d=>d.id===selected)?.offers;
      if (offers && offers.findIndex(d => d.room == item) == -1) {
        return true;
      }
      else {
        return false;
      }
    }

    return (
        <Dialog open={open} maxWidth={'lg'}>
            <DialogTitle>
                {'Agregar oferta'}
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
            <Stack direction={'row'} spacing={1} sx={{ width: '100%' }} mt={2}>
            
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
          <Stack direction={'row'} spacing={1} sx={{ width: '100%' }} mt={2}>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch checked={syncPrices} onChange={e => setSyncPrices(e.target.checked)} />
                }
                label="Sincronizar precios públicos y minoristas"
              />
            </Grid>
          </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cerrar</Button>
                <Button variant={'contained'} onClick={save}>{'Guardar oferta'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditOffer;