import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import DatePickerCustom from '../../../components/DatePickerCustom';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const EditOffer = ({ open, close, type, updateTypeOffers, children }) => {

    const [dateOfferType, setDateOfferType] = useState([null, null]);
    const [startDateOfferType, endDateOfferType] = dateOfferType;
    const [typeOfferPrice, setTypeOfferPrice] = useState();
    const [typeOfferPriceRetail, setTypeOfferPriceRetail] = useState();

    const handleTypeOfferPrice = e => setTypeOfferPrice(e.target.value);
    const handleTypeOfferPriceRetail = e => setTypeOfferPriceRetail(e.target.value);

    const save = () => {
        updateTypeOffers({
            date: dateOfferType,
            price: typeOfferPrice,
            priceRetail: typeOfferPriceRetail
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
                    <TextField
                        autoFocus
                        id="name"
                        label="Precio mayorista"
                        inputProps={{ min: 0 }}
                        type="number"
                        size={'small'}
                        value={typeOfferPrice}
                        onChange={handleTypeOfferPrice}
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        id="name"
                        label="Precio minorista"
                        inputProps={{ min: 0 }}
                        type="number"
                        size={'small'}
                        value={typeOfferPriceRetail}
                        onChange={handleTypeOfferPriceRetail}
                        variant="outlined"
                    />
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