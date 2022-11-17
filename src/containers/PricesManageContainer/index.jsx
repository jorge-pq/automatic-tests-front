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


function getBookingDate(range) {
    return new Date(range[0]).toLocaleDateString() + ' - ' + new Date(range[1]).toLocaleDateString();
}

const PricesManageContainer = ({ data }) => {

    const [hotels, setHotels] = useState(data);
    const [rooms, setRooms] = useState([]);
    const [types, setTypes] = useState([]);
    const [offers, setOffers] = useState([]);
    const [hotelSelected, setHotelSelected] = useState();
    const [roomSelected, setRoomSelected] = useState();
    const [typeSelected, setTypeSelected] = useState();

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
        }
        else {
            setTypes([]);
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

    const getFee = () => {
        return 0
    }

    const handleFee = () => {
       
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
            <Grid item xs={3}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={types}
                    size={'small'}
                    onChange={(event, op) => {
                        handleType(op);
                    }}
                    getOptionLabel={(option) => option.description}
                    renderInput={(params) => <TextField fullWidth {...params} label={'Tipo'} />}
                />
            </Grid>
            <Divider sx={{ width: '100%', my: 3 }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{'Oferta'}</TableCell>
                            <TableCell>{'Costo'}</TableCell>
                            <TableCell>{'Tarifa'}</TableCell>
                            <TableCell>{'Acción'}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offers.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {getBookingDate(row.date)}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    ${row.priceRetail}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField
                                        key={index}
                                        variant='outlined'
                                        size='small'
                                        defaultValue={getFee()}
                                        onChange={() => handleFee(index)}
                                        type="number"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        }}
                                        inputProps={{min: 0}}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Button variant="contained" startIcon={<SaveIcon />}>
                                        {'Guardar'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default PricesManageContainer;