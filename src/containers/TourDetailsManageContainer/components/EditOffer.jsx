import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, Switch } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DatePickerCustom from '../../../components/DatePickerCustom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


const EditOffer = ({ open, close, type, updateTypeOffers, children }) => {

    const [dateOfferType, setDateOfferType] = useState([null, null]);
    const [startDateOfferType, endDateOfferType] = dateOfferType;
  
    const [typeOfferCostAdult, setTypeOfferCostAdult] = useState();
    const [typeOfferCostChildren, setTypeOfferCostChildren] = useState();
    const [typeOfferCostInfant, setTypeOfferCostInfant] = useState();
  
    const [typeOfferPriceAdult, setTypeOfferPriceAdult] = useState();
    const [typeOfferPriceChildren, setTypeOfferPriceChildren,] = useState();
    const [typeOfferPriceInfant, setTypeOfferPriceInfant] = useState();
  
    const [typeOfferPriceRetailAdult, setTypeOfferPriceRetailAdult] = useState();
    const [typeOfferPriceRetailChildren, setTypeOfferPriceRetailChildren] = useState();
    const [typeOfferPriceRetailInfant, setTypeOfferPriceRetailInfant] = useState();

    const [isPeriod, setIsPeriod] = useState(false);
    const [date, setDate] = useState(new Date());

    const handleTypeOfferCostAdult = e => setTypeOfferCostAdult(e.target.value);
    const handleTypeOfferCostChildren = e => setTypeOfferCostChildren(e.target.value);
    const handleTypeOfferCostInfant = e => setTypeOfferCostInfant(e.target.value);
  
    const handleTypeOfferPriceAdult = e => setTypeOfferPriceAdult(e.target.value);
    const handleTypeOfferPriceChildren = e => setTypeOfferPriceChildren(e.target.value);
    const handleTypeOfferPriceInfant = e => setTypeOfferPriceInfant(e.target.value);
  
    const handleTypeOfferPriceRetailAdult = e => setTypeOfferPriceRetailAdult(e.target.value);
    const handleTypeOfferPriceRetailChildren = e => setTypeOfferPriceRetailChildren(e.target.value);
    const handleTypeOfferPriceRetailInfant = e => setTypeOfferPriceRetailInfant(e.target.value);

    const save = () => {
        updateTypeOffers({
            isPeriod: isPeriod,
            period: dateOfferType,
            date: date,
            costAdult: typeOfferCostAdult,
            costChildren: typeOfferCostChildren,
            costInfant: typeOfferCostInfant,
            priceAdult: typeOfferPriceAdult,
            priceChildren: typeOfferPriceChildren,
            priceInfant: typeOfferPriceInfant,
            priceRetailAdult: typeOfferPriceRetailAdult,
            priceRetailChildren: typeOfferPriceRetailChildren,
            priceRetailInfant: typeOfferPriceRetailInfant
        },
            type
        );
    }

    return (
        <Dialog open={open} maxWidth={'lg'}>
            <DialogTitle>
                {'Agregar oferta a '} <b style={{fontStyle: 'italic'}}>{`${children ? 'Niño ' : ''}${type}`}</b>
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
            <Grid md={3} xs={6} item>
              <FormControlLabel
                control={
                  <Switch checked={isPeriod} onChange={e => setIsPeriod(e.target.checked)} />
                }
                label="Período"
              />
            </Grid>
            {
              isPeriod ?
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
                </Grid> :
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
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cerrar</Button>
                <Button variant={'contained'} onClick={save}>{'Guardar oferta'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditOffer;