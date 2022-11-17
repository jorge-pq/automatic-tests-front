import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useMutation } from 'react-query';
import { updateRoom } from '../../services/hotels.service';

function getBookingDate(range) {
    return new Date(range[0]).toLocaleDateString() + ' - ' + new Date(range[1]).toLocaleDateString();
}

const PricesManageContainer = ({ data }) => {

    const [hotels, setHotels] = useState(data);
    const [rooms, setRooms] = useState([]);
    const [types, setTypes] = useState([]);
    const [childrens, setChildres] = useState([]);
    const [offers, setOffers] = useState([]);
    const [childrenOffers, setChildrenOffers] = useState([]);
    const [hotelSelected, setHotelSelected] = useState();
    const [roomSelected, setRoomSelected] = useState();
    const [typeSelected, setTypeSelected] = useState();
    const [childrenSelected, setChildrenSelected] = useState();

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const { mutate: edit } = useMutation(updateRoom, {
        onSuccess: (data) => {
            setSnackbarOpen(true);
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const handleHotel = option => {
        setHotelSelected(option);
        if (option) {
            setRooms(option.rooms);
        }
        else {
            setRooms([]);
        }
    }

    const handleRoom = option => {
        setRoomSelected(option);
        if (option) {
            setTypes(option.types);
            setChildres(option.childrens);
        }
        else {
            setTypes([]);
            setChildres([]);
        }
    }

    const handleType = option => {
        setTypeSelected(option);
        if (option) {
            setOffers(option.offers);
        }
        else {
            setOffers([]);
        }
    }

    const handleChildren = option => {
        setChildrenSelected(option);
        if (option) {
            setChildrenOffers(option.offers);
        }
        else {
            setChildrenOffers([]);
        }
    }

    const handleFee = (index, value) => {
        let offersUpd = [...offers];
        offersUpd[index].fee = value;
        setOffers(offersUpd);
    }

    const handleChildrenFee = (index, value) => {
        let offersUpd = [...childrenOffers];
        offersUpd[index].fee = value;
        setChildrenOffers(offersUpd);
    }

    const save = () => {
        let hotel = hotelSelected;
        let room_index = rooms.findIndex(d => d.name === roomSelected.name);
        let type_index = types.findIndex(d => d.description === typeSelected.description);
        hotel.rooms[room_index].types[type_index].offers = offers;

        const data = {
            hotelId: hotel._id,
            roomOld: roomSelected.name,
            name: roomSelected.name,
            types: hotel.rooms[room_index].types,
            childrens: hotel.rooms[room_index].childrens
        }

        edit(data);
    }

    const saveChildren = () => {
        let hotel = hotelSelected;
        let room_index = rooms.findIndex(d => d.name === roomSelected.name);
        let ch_index = childrens.findIndex(d => d.count === childrenSelected.count);
        hotel.rooms[room_index].childrens[ch_index].offers = childrenOffers;

        const data = {
            hotelId: hotel._id,
            roomOld: roomSelected.name,
            name: roomSelected.name,
            types: hotel.rooms[room_index].types,
            childrens: hotel.rooms[room_index].childrens
        }

        edit(data);
    }

    function getRoomUpdate() {

    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={hotels}
                    size={'small'}
                    onChange={(event, op) => {
                        handleHotel(op);
                    }}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField fullWidth {...params} label={'Hotel'} />}
                />
            </Grid>
            <Grid item xs={3}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={rooms}
                    size={'small'}
                    onChange={(event, op) => {
                        handleRoom(op);
                    }}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField fullWidth {...params} label={'Habitación'} />}
                />
            </Grid>

            <Divider sx={{ width: '100%', my: 3 }} />

            <Grid xs={6} item>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    sx={{ mb: 1 }}
                    options={types}
                    size={'small'}
                    onChange={(event, op) => {
                        handleType(op);
                    }}
                    getOptionLabel={(option) => option.description}
                    renderInput={(params) => <TextField {...params} label={'Tipo'} />}
                />

                <TableContainer component={Paper}>
                    {
                        offers.length > 0 &&
                        <Button variant="contained" onClick={save} sx={{ float: 'right', mt: 1, mr: 1 }} startIcon={<SaveIcon />}>
                            {'Guardar'}
                        </Button>
                    }
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ border: 'none' }}> <Typography variant='h6'>{'Adultos'}</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>{'Oferta'}</TableCell>
                                <TableCell align='left'>{'Costo'}</TableCell>
                                <TableCell align='center'>{'Tarifa'}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {offers.map((row, index) => (
                                <TableRow
                                    key={`${typeSelected.description}-${index}`}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align='left'>
                                        {getBookingDate(row.date)}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='left'>
                                        ${row.priceRetail}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='center'>
                                        <TextField
                                            key={index}
                                            variant='outlined'
                                            size='small'
                                            defaultValue={row.fee || 0}
                                            onChange={(e) => handleFee(index, e.target.value)}
                                            type="number"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            inputProps={{ min: 0 }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid xs={6} item>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={childrens}
                    sx={{ mb: 1 }}
                    size={'small'}
                    onChange={(event, op) => {
                        handleChildren(op);
                    }}
                    getOptionLabel={(option) => String(option.count)}
                    renderInput={(params) => <TextField fullWidth {...params} label={'Niños'} />}
                />
                <TableContainer component={Paper}>
                    {
                        childrenOffers.length > 0 &&
                        <Button variant="contained" onClick={saveChildren} sx={{ float: 'right', mt: 1, mr: 1 }} startIcon={<SaveIcon />}>
                            {'Guardar'}
                        </Button>
                    }
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ border: 'none' }}> <Typography variant='h6'>{'Niños'}</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>{'Oferta'}</TableCell>
                                <TableCell align='left'>{'Costo'}</TableCell>
                                <TableCell align='center'>{'Tarifa'}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {childrenOffers.map((row, index) => (
                                <TableRow
                                    key={`${childrenSelected.count}-${index}`}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align='left'>
                                        {getBookingDate(row.date)}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='left'>
                                        ${row.priceRetail}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align='center'>
                                        <TextField
                                            key={index}
                                            variant='outlined'
                                            size='small'
                                            defaultValue={row.fee || 0}
                                            onChange={(e) => handleChildrenFee(index, e.target.value)}
                                            type="number"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                            }}
                                            inputProps={{ min: 0 }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    sx={{ width: '100%', backgroundColor: 'rgb(46, 125, 50)', color: 'white' }}
                >
                    {'Los precios se han guardado satisfactoriamente'}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default PricesManageContainer;