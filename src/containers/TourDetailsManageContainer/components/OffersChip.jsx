import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Grid, Switch } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';



const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 700,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const OffersChip = ({ data, handleDeleteOffer, savePrices }) => {

    const [showEditPriceDialog, setShowEditPriceDialog] = useState(false);
    const [room, setRoom] = useState('');

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


    const handleTypeOfferCostAdult = e => setTypeOfferCostAdult(e.target.value);
    const handleTypeOfferCostChildren = e => setTypeOfferCostChildren(e.target.value);
    const handleTypeOfferCostInfant = e => setTypeOfferCostInfant(e.target.value);

    const handleTypeOfferPriceAdult = e => {
        setTypeOfferPriceAdult(e.target.value);
        if (syncPrices) {
            setTypeOfferPriceRetailAdult(e.target.value);
        }
    }
    const handleTypeOfferPriceChildren = e => {
        setTypeOfferPriceChildren(e.target.value);
        if (syncPrices) {
            setTypeOfferPriceRetailChildren(e.target.value);
        }
    }
    const handleTypeOfferPriceInfant = e => {
        setTypeOfferPriceInfant(e.target.value);
        if (syncPrices) {
            setTypeOfferPriceRetailInfant(e.target.value);
        }
    }

    const handleTypeOfferPriceRetailAdult = e => setTypeOfferPriceRetailAdult(e.target.value);
    const handleTypeOfferPriceRetailChildren = e => setTypeOfferPriceRetailChildren(e.target.value);
    const handleTypeOfferPriceRetailInfant = e => setTypeOfferPriceRetailInfant(e.target.value);

    
    const showPricesEdit = (item) => {
        setTypeOfferCostAdult(item.costAdult);
        setTypeOfferCostChildren(item.costChildren);
        setTypeOfferCostInfant(item.costInfant);
        setTypeOfferPriceAdult(item.priceAdult);
        setTypeOfferPriceChildren(item.priceChildren);
        setTypeOfferPriceInfant(item.priceInfant);
        setTypeOfferPriceRetailAdult(item.priceRetailAdult);
        setTypeOfferPriceRetailChildren(item.priceRetailChildren);
        setTypeOfferPriceRetailInfant(item.priceRetailInfant);
        setRoom(item.room);
        setShowEditPriceDialog(true)
    }

    const handlePrices = () => {
        savePrices({
            room: room,
            costAdult: typeOfferCostAdult,
            costChildren: typeOfferCostChildren,
            costInfant: typeOfferCostInfant,
            priceAdult: typeOfferPriceAdult,
            priceChildren: typeOfferPriceChildren,
            priceInfant: typeOfferPriceInfant,
            priceRetailAdult: typeOfferPriceRetailAdult,
            priceRetailChildren: typeOfferPriceRetailChildren,
            priceRetailInfant: typeOfferPriceRetailInfant
        })
        setShowEditPriceDialog(false);
    }

    return (
        <>
            <Stack direction="row" spacing={1}>
                {
                    data.map((item, index) =>
                        <HtmlTooltip
                            title={
                                <React.Fragment>
                                    <ul>
                                        <li>Costo adultos: <b>${item.costAdult}</b> - Precio publico de adultos: <b>${item.priceAdult}</b> - Precio minorista de adultos: <b>${item.priceRetailAdult}</b></li>
                                        <li>Costo niños: <b>${item.costChildren}</b> -  Precio publico de niños: <b>${item.priceChildren}</b> - Precio minorista de niños: <b>${item.priceRetailChildren}</b></li>
                                        <li>Costo infantes: <b>${item.costInfant}</b> -  Precio publico de infantes: <b>${item.priceInfant}</b> - Precio minorista de infantes: <b>${item.priceRetailInfant}</b></li>
                                    </ul>
                                </React.Fragment>
                            }
                        >
                            <Chip
                                key={index}
                                // label={getFormatDate(item.date, item.period, item.isPeriod)}
                                label={
                                    <>
                                        {item.room}
                                        <EditIcon fontSize='small' color='inherit' sx={{ ml: 1, cursor: 'pointer' }} onClick={()=>showPricesEdit(item)} />
                                    </>
                                }
                                onDelete={() => handleDeleteOffer(item)}
                            />
                        </HtmlTooltip>
                    )
                }
            </Stack>
            <Dialog open={showEditPriceDialog}>
                <DialogTitle>
                    {'Editar precios a '+ room}
                    <IconButton
                        aria-label="close"
                        onClick={() => setShowEditPriceDialog(false)}
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
                    <Divider sx={{ width: '100%', my: 1 }}>
                        <Typography variant={'caption'}>
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
                        <Typography variant={'caption'}>
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
                        <Typography variant={'caption'}>
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
                    <Button onClick={() => setShowEditPriceDialog(false)}>Cerrar</Button>
                    <Button variant={'contained'} onClick={handlePrices}>{'Guardar'}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default OffersChip;